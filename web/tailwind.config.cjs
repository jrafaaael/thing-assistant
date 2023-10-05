const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				orange: {
					hard: '#FF2E00'
				}
			},
			height: {
				...defaultTheme.height,
				screen: 'calc(var(--vh,1vh)*100)'
			},
			maxHeight: {
				...defaultTheme.maxHeight,
				screen: 'calc(var(--vh,1vh)*100)'
			}
		}
	},

	plugins: []
};

module.exports = config;
