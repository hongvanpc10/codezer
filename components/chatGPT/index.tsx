import { Transition } from '@headlessui/react'
import { useMutation } from '@tanstack/react-query'
import { ChatCompletionRequestMessage } from 'openai'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { chatCompletion } from '~/apiServices'
import images from '~/assets/images'
import routes from '~/config/routes'
import { useAuth } from '~/hooks'
import Button from '../button'
import Input from '../form/input'
import { RefreshIcon, SmsOutlineIcon } from '../icons'
import Image from '../image'
import Modal from '../modal'
import Message from './message'

const DEFAULT: ChatCompletionRequestMessage[] = [
	{
		role: 'system',
		content:
			'You are Coco, a helpful, creative, clever, and very friendly assistant',
	},
]

export default function ChatGPT() {
	const { auth } = useAuth()
	const user = auth?.data

	const [messages, setMessages] =
		useState<ChatCompletionRequestMessage[]>(DEFAULT)

	const { register, handleSubmit, setValue, setFocus } = useForm<{
		message: string
	}>()

	const ref = useRef<HTMLDivElement>(null)

	const { mutate, isLoading } = useMutation(chatCompletion, {
		onSuccess(res) {
			res && setMessages(prev => [...prev, res])
		},
	})

	const onSubmit = handleSubmit(({ message }) => {
		if (!isLoading) {
			setMessages(prev => {
				mutate([...prev, { role: 'user', content: message }])
				return [...prev, { role: 'user', content: message }]
			})

			setValue('message', '')
			setFocus('message')
		}
	})

	const handleClear = () => {
		if (!isLoading) {
			setMessages(DEFAULT)
			setValue('message', '')
			setFocus('message')
		}
	}

	useEffect(() => {
		ref.current?.scrollTo({
			top: ref.current.scrollHeight + 1000,
			behavior: 'smooth',
		})
	}, [messages])

	return (
		<div className='show-on-md'>
			<Modal
				maxWidth='3xl'
				defaultOpen={false}
				render={() => (
					<div className='h-[85vh] flex flex-col'>
						<h1 className='font-bold text-2xl mb-3 ml-4'>Trợ lí</h1>

						{user ? (
							<>
								<div
									ref={ref}
									className='space-y-4 overflow-y-auto flex-1 pt-3 pb-16 scroll-sm px-3'
								>
									{messages
										.filter(
											message => message.role !== 'system'
										)
										.map((message, index) => (
											<Message
												key={index}
												role={message.role}
												content={message.content}
												avatar={user.avatar}
											/>
										))}

									{messages.filter(
										message => message.role !== 'system'
									).length === 0 && (
										<div className='flex justify-center'>
											<Image
												alt=''
												src={images.chatGPTLogo}
												width={64}
												height={64}
											/>
										</div>
									)}

									{isLoading && <Message />}
								</div>

								<div className='pt-4 bg-white relative'>
									<Transition
										as={Fragment}
										show={
											messages.filter(
												message =>
													message.role !== 'system'
											).length > 0
										}
										enter='duration-200'
										enterFrom='opacity-0 translate-y-2'
										enterTo='opacity-100 translate-y-0'
										leave='duration-100'
										leaveFrom='opacity-100 translate-y-0'
										leaveTo='opacity-0 translate-y-2'
									>
										<button
											onClick={handleClear}
											className='bg-blue-500 flex items-center justify-center w-8 h-8 rounded-full text-white absolute right-4 -top-10 transition hover:bg-blue-600 hover:rotate-[270deg] duration-300'
										>
											<RefreshIcon className='h-4' />
										</button>
									</Transition>

									<form onSubmit={onSubmit}>
										<Input
											placeholder='Bạn muốn hỏi gì?'
											autoFocus
											icon={SmsOutlineIcon}
											{...register('message')}
										/>
									</form>
								</div>
							</>
						) : (
							<div className='flex flex-col items-center pt-24'>
								<p className='text-lg mb-6 max-w-[50%] text-center'>
									Vui lòng đăng nhập để sử dụng dịch vụ miễn
									phí tại Codezer.
								</p>
								<Button href={routes.login}>Đăng nhập</Button>
							</div>
						)}
					</div>
				)}
			>
				{setIsOpen => (
					<button
						onClick={() => setIsOpen(true)}
						className='inline-flex rounded-3xl transition hover:bg-blue-700 bg-blue-600 shadow-lg shadow-blue-900/30 p-2 group fixed top-40 right-6 z-10'
					>
						<Image
							alt=''
							src={images.chatGPTLogo}
							width={8}
							height={8}
							className='group-hover:rotate-180 transition group-hover:scale-105 duration-700'
						/>
					</button>
				)}
			</Modal>
		</div>
	)
}
