/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					300: '#666bb2',
					DEFAULT: '#4249AE'
				}
			},
			fontFamily: {
				sans: ['Outfit', 'sans-serif'],
				mono: ['monospace']
			},
			animation: {
				'spin-slow': 'spin 3s linear infinite'
			}
		}
	},
	plugins: []
};
