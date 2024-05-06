export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                green: '#02E00B',
                dark: '#586D8C',
                gray: '#C5D3E8',
                border: '#E4EBF7',
            },
            fontFamily: {
                sans: ['RobotoFlex', 'sans-serif'],
            },
            screens: {
                xs: '450px',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
