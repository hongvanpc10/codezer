import request, {
	Params,
	ResData,
	ResDataWithPagination,
} from '~/utils/request'

export type NotificationsSettingKey =
	| 'newBlog'
	| 'newFromFollowings'
	| 'newFollower'
	| 'newComment'
	| 'newReply'
	| 'newLike'
	| 'newReaction'

export interface User {
	avatar: string
	fullName: string
	slug: string
	role: 'user' | 'admin'
	isVerified: boolean
	_id: string
	bio: string
	createdAt: string
	scores: number
	followers: string[]
	followings: string[]
	facebook: string
	twitter: string
	github: string
	blogsCount: number
	likesCount: number
	website: string
	type: 'register' | 'google' | 'facebook'
	savedBlogs: string[]

	notificationsSetting: {
		newBlog: boolean
		newFromFollowings: boolean
		newFollower: boolean
		newComment: boolean
		newReply: boolean
		newLike: boolean
		newReaction: boolean
	}
}

export const getTopUsers = async () => {
	const res = await request.get<ResData<User[]>>('/users/top')

	return res?.data
}

export const getSuggestion = async (accessToken: string) => {
	const res = await request.get<ResData<User[]>>('/users/suggestion', {
		headers: {
			Authorization: accessToken,
		},
	})

	return res?.data
}

export const getUsers = async (params: Params) => {
	const res = await request.get<ResData<User[]>>('/users', { params })

	return res?.data
}

export const getProfile = async (slug: string) => {
	const res = await request.get<ResData<User>>('/users/' + slug)

	return res?.data
}

export const update = async (data: any, accessToken: string) => {
	const res = await request.patch<any, ResData<User>>('/users', data, {
		headers: {
			Authorization: accessToken,
		},
	})

	return res?.data
}

export const follow = async (id: string, accessToken: string) => {
	const res = await request.get('/users/' + id + '/follow', {
		headers: {
			Authorization: accessToken,
		},
	})

	return res
}

export const unfollow = async (id: string, accessToken: string) => {
	const res = await request.get('/users/' + id + '/unfollow', {
		headers: {
			Authorization: accessToken,
		},
	})

	return res
}

export const verify = async (id: string, accessToken: string) => {
	const res = await request.get('/users/' + id + '/verify', {
		headers: {
			Authorization: accessToken,
		},
	})

	return res
}

export interface ChangePasswordData {
	password: string
	newPassword: string
}

export const changePassword = async (
	data: ChangePasswordData,
	accessToken: string
) => {
	const res = await request.patch('/users/change-password', data, {
		headers: {
			Authorization: accessToken,
		},
	})

	return res?.data
}

export const getFollowers = async (id: string, params?: Params) => {
	const res = await request.get<ResDataWithPagination<{ users: User[] }>>(
		'/users/' + id + '/followers',
		{
			params,
		}
	)

	return res?.data
}

export const getFollowings = async (id: string, params?: Params) => {
	const res = await request.get<ResDataWithPagination<{ users: User[] }>>(
		'/users/' + id + '/followings',
		{
			params,
		}
	)

	return res?.data
}
