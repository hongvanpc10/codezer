import Head from 'next/head'
import Script from 'next/script'

export default function MonetagAds() {
	return (
		<>
			<Head>
				<meta
					name='monetag'
					content='9d3e0c856a669cdf54f12eecd6e3f4f2'
				></meta>
			</Head>

			<Script
				src='https://inklinkor.com/tag.min.js'
				data-zone={5930649}
			/>
		</>
	)
}
