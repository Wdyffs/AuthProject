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
            colors: {
                "custom-blue": "#02223B",
            },
            backgroundImage: {
                "lights": "url('./src/assets/bg-lights.jpg')",
                "mountain": "url('./src/assets/main.jpg')"
            }
        },
    },
    plugins: [],
};
