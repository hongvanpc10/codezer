import { useMutation } from '@tanstack/react-query'
import { usersService } from '~/apiServices'
import { NotificationsSettingKey, User } from '~/apiServices/usersService'
import { useAuth } from '~/hooks'
import Toggle from '../toggle'

export interface Props {
	label: string
	_key: NotificationsSettingKey
}

export default function NotificationSettingItem({ label, _key }: Props) {
	const { auth, updateUser } = useAuth()
	const user = auth?.data as User

	const { mutate } = useMutation(
		(data: boolean) =>
			usersService.update(
				{
					notificationsSetting: {
						...user.notificationsSetting,
						[_key]: data,
					},
				},
				auth?.accessToken as string
			),
		{
			onSuccess(data) {
				data && updateUser(data)
			},
		}
	)

	return (
		<div className='flex items-center justify-between'>
			<label>{label}</label>
			<Toggle
				defaultChecked={user?.notificationsSetting[_key]}
				onChange={mutate}
			/>
		</div>
	)
}
