/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss/plugin')} */

const plugin = require('tailwindcss/plugin')

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./layouts/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				display: ['var(--font-baloo-2)'],
			},

			typography: ({ theme }) => ({
				blue: {
					css: {
						'--tw-prose-body': 'var(--text-blue)',
						'--tw-prose-headings': 'var(--text-blue)',
						'--tw-prose-links': theme('colors.blue[600]'),
						'--tw-prose-bold': 'var(--text-blue)',
						'--tw-prose-counters': theme('colors.blue[600]'),
						'--tw-prose-bullets': theme('colors.blue[600]'),
						'--tw-prose-hr': theme('colors.blue[100]'),
						'--tw-prose-quotes': theme('colors.blue[900]/0.9'),
						'--tw-prose-quote-borders': theme('colors.blue[500]'),
						'--tw-prose-code': theme('colors.blue[900]'),
						'--tw-prose-th-borders': theme('colors.blue[300]'),
						'--tw-prose-td-borders': theme('colors.blue[200]'),
						'--tw-prose-captions': theme('colors.blue[900]/0.9'),
					},
				},
			}),
		},
		fontFamily: {
			sans: ['var(--font-montserrat)', 'sans-serif'],
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/line-clamp'),
		require('@hongvanpc10/tailwindcss-12-column-grid'),
		require('@hongvanpc10/tailwindcss-responsive'),

		plugin(function ({ addComponents, addUtilities }) {
			addComponents({
				'.text-blue': {
					color: '#122456',
				},
			})

			addUtilities({
				'.overflow-overlay': {
					overflow: 'overlay',
				},
			})
		}),
	],
	safelist: [
		{ pattern: /(w|h)-([0-9]+)/ },
		{ pattern: /my-[0-9]+/ },
		{ pattern: /^rounded/ },
		{
			pattern: /ring(-(0|1|2|4|8))?/,
		},
	],
}
