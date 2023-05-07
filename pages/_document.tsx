import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
	return (
		<Html lang='vi' style={{ scrollBehavior: 'smooth' }}>
			<Head>
				<Script
					strategy='beforeInteractive'
					src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js'
				></Script>

				<meta name="monetag" content="9d3e0c856a669cdf54f12eecd6e3f4f2"></meta>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
