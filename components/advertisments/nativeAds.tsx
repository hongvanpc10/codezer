import Script from 'next/script'

export default function NativeAds() {
	return (
		<>
			<Script
				async
				data-cfasync='false'
				src='//pl18807169.highrevenuegate.com/ad423f4a2f1d760bbc03d49faa685abf/invoke.js'
			></Script>

			<div id='container-ad423f4a2f1d760bbc03d49faa685abf'></div>
		</>
	)
}
