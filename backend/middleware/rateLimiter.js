const loginAttempts = new Map();
const lockouts = new Map(); 

const LOCKOUT_DURATION = 60 * 1000;
const MAX_ATTEMPTS = 3;

const rateLimiter = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next();
    }

    const now = Date.now();

    if (lockouts.has(email)) {
        const lockoutInfo = lockouts.get(email);
        const timeRemaining = lockoutInfo.until - now;

        if (timeRemaining > 0) {
            const secondsRemaining = Math.ceil(timeRemaining / 1000);
            return res.status(429).json({
                success: false,
                message: `Terlalu banyak percobaan login gagal. Coba lagi dalam ${secondsRemaining} detik.`,
                lockedUntil: lockoutInfo.until,
                remainingSeconds: secondsRemaining
            });
        } else {
            lockouts.delete(email);
            loginAttempts.delete(email);
        }
    }

    next();
};

export const recordFailedAttempt = (email) => {
    const now = Date.now();

    if (!loginAttempts.has(email)) {
        loginAttempts.set(email, []);
    }

    const attempts = loginAttempts.get(email);

    attempts.push(now);

    const recentAttempts = attempts.filter(time => now - time < LOCKOUT_DURATION);
    loginAttempts.set(email, recentAttempts);

    if (recentAttempts.length >= MAX_ATTEMPTS) {
        const lockoutUntil = now + LOCKOUT_DURATION;
        lockouts.set(email, {
            until: lockoutUntil,
            attempts: recentAttempts.length
        });

        return {
            locked: true,
            until: lockoutUntil,
            remainingSeconds: Math.ceil(LOCKOUT_DURATION / 1000)
        };
    }

    return {
        locked: false,
        attemptsRemaining: MAX_ATTEMPTS - recentAttempts.length
    };
};

export const clearAttempts = (email) => {
    loginAttempts.delete(email);
    lockouts.delete(email);
};

setInterval(() => {
    const now = Date.now();

    for (const [email, lockoutInfo] of lockouts.entries()) {
        if (now > lockoutInfo.until) {
            lockouts.delete(email);
            loginAttempts.delete(email);
        }
    }

    for (const [email, attempts] of loginAttempts.entries()) {
        const recentAttempts = attempts.filter(time => now - time < LOCKOUT_DURATION);
        if (recentAttempts.length === 0) {
            loginAttempts.delete(email);
        } else {
            loginAttempts.set(email, recentAttempts);
        }
    }
}, 5 * 60 * 1000);

export default rateLimiter;
