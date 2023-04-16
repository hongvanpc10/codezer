import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/react'
import { NextPage } from 'next'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import 'prismjs/themes/prism-okaidia.min.css'
import { ReactElement, useEffect } from 'react'
import colors from 'tailwindcss/colors'
import Fly from '~/components/fly'
import Private from '~/components/private'
import Restricted from '~/components/restricted'
import fonts from '~/config/fonts'
import queryClient from '~/config/queryClient'
import seoConfig from '~/config/seoConfig'
import socket from '~/config/socket'
import { LayoutProps, MainLayout } from '~/layouts'
import '~/styles/globals.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	Layout?: (props: LayoutProps) => ReactElement
	isRestricted?: boolean
	isPrivate?: boolean
	isAdminRequired?: boolean
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

console.log(
	'%cHello! 😁',
	`font-size: 1.25rem; font-weight: bold; color: ${colors.blue[500]};`
)
console.log(
	'%cWelcom to Codezer! 🔴🟡🟢',
	`color: ${colors.yellow[500]}; font-size: 1rem;`
)

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const Layout = Component.Layout || MainLayout

	useEffect(() => {
		socket.connect()
	}, [])

	return (
		<QueryClientProvider client={queryClient}>
			<GoogleOAuthProvider
				clientId={
					process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID as string
				}
			>
				<div
					className={`${fonts.montserrat.variable} ${fonts.baloo2.variable} font-sans text-blue min-h-screen bg-slate-50/75`}
				>
					<DefaultSeo {...seoConfig} />

					<Fly />

					{process.env.NODE_ENV === 'production' && <Analytics />}

					<Private
						isPrivate={Component.isPrivate}
						isAdminRequired={Component.isAdminRequired}
					/>

					<Restricted isRestricted={Component.isRestricted} />

					<Layout>
						<Component {...pageProps} />
					</Layout>
				</div>
			</GoogleOAuthProvider>
		</QueryClientProvider>
	)
}
