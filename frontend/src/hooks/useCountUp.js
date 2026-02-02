import { useState, useEffect, useRef } from 'react';

const useCountUp = (end, duration = 2000, shouldStart = false) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (!shouldStart || hasStarted) return;

        setHasStarted(true);
        const startTime = Date.now();
        const startValue = 0;

        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

        const updateCount = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easedProgress = easeOutQuart(progress);
            const currentCount = Math.floor(startValue + (end - startValue) * easedProgress);

            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(updateCount);
    }, [end, duration, shouldStart, hasStarted]);

    return count;
};

export default useCountUp;
