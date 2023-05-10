import { LayoutProps } from '.'

export default function EmptyLayout({ children }: LayoutProps) {
	return (
		<div className='flex items-center justify-center sm:px-3 py-3 px-2 min-h-screen'>{children}</div>
	)
}
