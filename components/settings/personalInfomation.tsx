import pattern from '~/config/pattern'
import { useAuth } from '~/hooks'
import Box from '../box'
import AvatarUpdater from './avatarUpdater'
import Updater from './updater'

export default function PersonalInformation() {
	const { auth } = useAuth()

	const user = auth?.data

	return (
		<section>
			<h2 className='text-2xl font-bold mb-8'>Thông tin cá nhân</h2>

			<div className='space-y-10'>
				<Box>
					<Updater
						label='Tên'
						name='fullName'
						value={user?.fullName}
						placeholder='Nhập tên mới của bạn'
						rules={{
							required: 'Tên không thể để trống',
						}}
					/>
				</Box>

				<Box>
					<Updater
						label='Tiểu sử'
						name='bio'
						placeholder='Nhập tiểu sử của bạn'
						value={user?.bio}
						maxLength={255}
					/>
				</Box>

				<Box>
					<div className='space-y-6'>
						<Updater
							label='Website'
							name='website'
							value={user?.website}
							placeholder='Nhập đường dẫn website của bạn'
							rules={{
								pattern: {
									value: pattern.url,
									message: 'Liên kết không chính xác',
								},
							}}
						/>

						<Updater
							label='Facebook'
							name='facebook'
							value={user?.facebook}
							placeholder='Nhập đường dẫn Facebook của bạn'
							rules={{
								pattern: {
									value: pattern.url,
									message: 'Liên kết không chính xác',
								},
							}}
						/>

						<Updater
							label='Twitter'
							name='twitter'
							value={user?.twitter}
							placeholder='Nhập đường dẫn Twitter của bạn'
							rules={{
								pattern: {
									value: pattern.url,
									message: 'Liên kết không chính xác',
								},
							}}
						/>

						<Updater
							label='Github'
							name='github'
							value={user?.github}
							placeholder='Nhập đường dẫn Github của bạn'
							rules={{
								pattern: {
									value: pattern.url,
									message: 'Liên kết không chính xác',
								},
							}}
						/>
					</div>
				</Box>

				<Box>
					<AvatarUpdater value={user?.avatar as string} />
				</Box>
			</div>
		</section>
	)
}
