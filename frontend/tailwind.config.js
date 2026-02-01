/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#455A64',
                    dark: '#37474F',
                    light: '#607D8B',
                },
                secondary: '#CFD8DC',
                background: '#ECEFF1',
                surface: '#FFFFFF',
                accent: '#FF5722',
                text: {
                    main: '#263238',
                    secondary: '#546E7A',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
