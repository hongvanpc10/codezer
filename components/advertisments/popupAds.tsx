import Script from 'next/script'

export default function PopupAds() {
	return (
		<Script id='popup' type='text/javascript'>
			{
				'var uid="459019",wid="690535",pop_fback="up",pop_tag=document.createElement("script");pop_tag.src="//cdn.popcash.net/show.js",document.body.appendChild(pop_tag),pop_tag.onerror=function(){(pop_tag=document.createElement("script")).src="//cdn2.popcash.net/show.js",document.body.appendChild(pop_tag)};'
			}
		</Script>
	)
}
