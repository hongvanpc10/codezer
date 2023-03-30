export default function Error({ children }: { children: string }) {
	return <span className='inline-block text-red-500 mt-1'>{children}</span>
}
