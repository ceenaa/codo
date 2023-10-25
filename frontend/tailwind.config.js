/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			container: {
				center: true,
				padding: {
					DEFAULT: '1rem',
				},
			},
      boxShadow: {
				box: '0 0 30px 8px rgb(250,204,20)',
				box2: '0 0 50px 8px rgb(250,204,20)',
				table: '0 0 0 2px'
			}
		},
	},
	important: true,
	plugins: [
		function ({ addVariant }) {
			addVariant('child', '& > *');
			addVariant('child-hover', '& > *:hover');
		},
	],
};
