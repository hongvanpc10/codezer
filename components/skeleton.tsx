import { CSSProperties } from 'react'

interface Props {
	width?: number | string
	height?: number | string
	rounded?: boolean | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
	py?: number | string
	ratio?: [number, number] | string
	size?: number | string
}

function Skeleton({ height, width, rounded, py, ratio, size }: Props) {
	const style: CSSProperties = {}

	if (typeof size === 'string') {
		style.width = size
		style.height = size
	}

	if (typeof width === 'string') style.width = width
	if (typeof height === 'string') style.height = height

	return (
		<div
			className={`${typeof py === 'number' && `py-${py}`}`}
			style={
				typeof py === 'string'
					? {
							paddingTop: py,
							paddingBottom: py,
					  }
					: {}
			}
		>
			<div
				className={`${
					width
						? typeof width === 'number' && `w-${width}`
						: !size && 'w-full'
				} ${typeof height === 'number' && `h-${height}`} ${
					typeof size === 'number' && `h-${size} w-${size}`
				} animate-pulse bg-blue-50 ${
					rounded &&
					(rounded === true ? 'rounded' : 'rounded-' + rounded)
				} ${
					ratio &&
					(typeof ratio === 'string'
						? ratio
						: `aspect-w-${ratio[0]} aspect-h-${ratio[1]}`)
				}`}
				style={style}
			/>
		</div>
	)
}

interface TextProps {
	size?: 'sm' | 'lg' | 'base' | 'xs' | 'xl' | '2xl' | '3xl'
	width?: number | string | 'full'
	lines?: number
	lastLineWidth?: string
	text?: number
	leading?: number
}

const sizes = {
	base: [1, 1.5],
	sm: [0.875, 1.25],
	lg: [1.125, 1.75],
	xs: [0.75, 1],
	xl: [1.25, 1.75],
	'2xl': [0.5, 2],
	'3xl': [1.875, 2.25],
}

Skeleton.Text = function Text({
	size = 'base',
	width,
	lines = 1,
	lastLineWidth,
	leading,
	text,
}: TextProps) {
	return (
		<>
			{Array.from(Array(lines)).map((_, index) => (
				<Skeleton
					key={index}
					height={text ? text + 'rem' : sizes[size][0] + 'rem'}
					width={
						lastLineWidth
							? index === lines - 1
								? lastLineWidth
								: width || '100%'
							: width || '100%'
					}
					py={
						leading
							? (leading - (text ? text : sizes[size][0])) / 2 +
							  'rem'
							: (sizes[size][1] - sizes[size][0]) / 2 + 'rem'
					}
					rounded='lg'
				/>
			))}
		</>
	)
}

export default Skeleton
