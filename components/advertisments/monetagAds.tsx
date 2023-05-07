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

			<Script id='monetag'>{`(function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})(document.createElement('script'),'https://inklinkor.com/tag.min.js',5930649,document.body||document.documentElement)`}</Script>
		</>
	)
}
