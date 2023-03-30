import { Baloo_2, Montserrat } from '@next/font/google'

const montserrat = Montserrat({
	subsets: ['vietnamese', 'latin'],
	variable: '--font-montserrat',
	display: 'fallback'
})

const baloo2 = Baloo_2({
	subsets: ['vietnamese', 'latin'],
	variable: '--font-baloo-2',
	display: 'fallback'
})

const fonts = { montserrat, baloo2 }

export default fonts
