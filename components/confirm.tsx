import Button from './button'
import { CloseIcon } from './icons'
import Modal from './modal'

interface Props {
	message: string
	subMessage?: string
	onClose?: Function
	onConfirm?: Function
}

export default function Confirm({
	message,
	subMessage,
	onClose,
	onConfirm,
}: Props) {
	return (
		<Modal
			render={setIsOpen => (
				<div className='sm:px-2 sm:py-1'>
					<div className='flex justify-end -mt-3 sm:-mt-2 -mr-2.5'>
						<button
							onClick={() => {
								setIsOpen(false)
								onClose && onClose()
							}}
						>
							<CloseIcon className='h-5' />
						</button>
					</div>

					<h2 className='text-lg font-medium'>{message}</h2>

					{subMessage && <p className='mt-2'>{subMessage}</p>}

					<div className='flex items-center mt-8 justify-end space-x-2'>
						<Button
							onClick={() => {
								setIsOpen(false)
								onConfirm && onConfirm()
								onClose && onClose()
							}}
						>
							Tiếp tục
						</Button>

						<Button
							color='slate'
							onClick={() => {
								setIsOpen(false)
								onClose && onClose()
							}}
						>
							Huỷ
						</Button>
					</div>
				</div>
			)}
			onClose={onClose}
		/>
	)
}
