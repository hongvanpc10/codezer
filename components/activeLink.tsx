import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

interface Props extends LinkProps {
	className?: string | ((isActive: boolean) => string)
	children?: ((isActive: boolean) => ReactNode) | ReactNode
	title?: string
}

export default function ActiveLink({
	className,
	children,
	title,
	...passProps
}: Props) {
	const router = useRouter()

	return (
		<Link
			className={
				typeof className === 'function'
					? className(router.pathname === passProps.href)
					: className
			}
			title={title}
			{...passProps}
		>
			{typeof children === 'function'
				? children(router.pathname === passProps.href)
				: children}
		</Link>
	)
}
