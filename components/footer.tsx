import Link from 'next/link'
import routes from '~/config/routes'
import { FacebookIcon2, GithubIcon2, TwitterIcon } from './icons'
import Logo from './logo'

interface Product {
	label: string
	href: string
	newTab?: boolean
}

export default function Footer() {
	const products: Product[] = [
		{
			label: 'Codezer',
			href: routes.home,
		},
		{
			label: 'Snake Game',
			href: 'https://snake.codezer.online',
		},
		{
			label: 'Donate',
			href: routes.directLinkAds,
			newTab: true,
		},
	]

	return (
		<footer className='bg-blue-100/30'>
			<div className='container px-3 sm:px-4 mx-auto py-4 sm:pt-6 sm:pb-4 flex items-center flex-col'>
				<Logo />

				<ul className='flex items-center mt-3 flex-wrap -ml-4'>
					{products.map((product, index) => (
						<li key={index} className='ml-4 mb-3'>
							<Link
								href={product.href}
								className='underline underline-offset-2'
								{...(product.newTab
									? { target: '_blank' }
									: {})}
							>
								{product.label}
							</Link>
						</li>
					))}
				</ul>
			</div>

			<div className='border-t border-t-blue-900/10'>
				<div className='sm:h-16 container sm:flex-row flex-col px-3 sm:px-4 mx-auto flex items-center justify-between pt-4 py-6 sm:py-0'>
					<span className='flex items-center'>
						<span className='text-lg mr-1'>©</span> 2023 Codezer™.
						All rights reserved.
					</span>

					<div className='flex items-center space-x-8 text-blue-900/75 sm:mt-0 mt-4'>
						<Link href={routes.directLinkAds} target='_blank'>
							<FacebookIcon2 className='h-5' />
						</Link>
						<Link href={routes.directLinkAds} target='_blank'>
							<GithubIcon2 className='h-5' />
						</Link>
						<Link href={routes.directLinkAds} target='_blank'>
							<TwitterIcon className='h-5' />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}
