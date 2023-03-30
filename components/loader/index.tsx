import { CSSProperties, useEffect } from 'react'
import styles from './loader.module.css'

function Loader() {
	useEffect(() => {
		document.body.classList.add('overflow-hidden')

		return () => document.body.classList.remove('overflow-hidden')
	}, [])

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black/30 !m-0 z-50'>
			<span className={styles.loader} />
		</div>
	)
}

Loader.Inline = function Inline() {
	return (
		<div className='flex justify-center mt-8'>
			<span
				className={styles.loader}
				style={{ '--uib-size': '1.5rem' } as CSSProperties}
			/>
		</div>
	)
}

export default Loader
