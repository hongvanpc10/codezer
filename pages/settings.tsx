import { NextSeo } from 'next-seo'
import {
	Notification,
	PersonalInformation,
	Security,
} from '~/components/settings'
import { HeaderOnlyLayout } from '~/layouts'
import { NextPageWithLayout } from './_app'
import { useAuth } from '~/hooks'

const Settings: NextPageWithLayout = () => {
	const { auth } = useAuth()
	const user = auth?.data

	return (
		<div className='space-y-16 mx-auto xl:w-7/12 lg:w-10/12'>
			<NextSeo title='Cài đặt' />

			<PersonalInformation />

			<Notification />

			{user?.type === 'register' && <Security />}
		</div>
	)
}

Settings.Layout = HeaderOnlyLayout
Settings.isPrivate = true

export default Settings
