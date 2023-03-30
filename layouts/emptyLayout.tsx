import { LayoutProps } from '.'

export default function EmptyLayout({ children }: LayoutProps) {
	return (
		<div className='flex items-center justify-center p-3 min-h-screen'>{children}</div>
	)
}
