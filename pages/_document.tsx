import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
	return (
		<Html lang='vi'>
			<Head>
				<Script
					strategy='beforeInteractive'
					src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js'
				></Script>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
