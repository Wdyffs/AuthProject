/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            keyframes: {
                fall: {
                    '0%': {
                        transform: 'translateY(-50%)',
                    },
                    '100%': {
                        transform: 'translateY(0)',
                    },
                },
            },
            animation: {
                fall: 'fall 0.25s ease-out 0s',
            },
        },
    },
    plugins: [],
};
