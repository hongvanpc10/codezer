import request, {
	Params,
	ResData,
	ResDataWithPagination,
} from '~/utils/request'
import { User } from './usersService'
import { CounterObject } from '@charkour/react-reactions'

export interface CreatePostData {
	content: string
	images: string[]
}

export interface Post extends CreatePostData {
	author: User
	reactions: CounterObject[]
	createdAt: string
	_id: string
}

export const create = async (data: CreatePostData, accessToken: string) => {
	const res = await request.post<CreatePostData, ResData<Post>>(
		'/posts',
		data,
		{
			headers: { Authorization: accessToken },
		}
	)

	return res?.data
}

export const get = async (accessToken: string, params?: Params) => {
	const res = await request.get<ResDataWithPagination<{ posts: Post[] }>>(
		'/posts',
		{
			headers: { Authorization: accessToken },
			params,
		}
	)

	return res?.data
}

export const update = async (
	id: string,
	data: CreatePostData,
	accessToken: string
) => {
	const res = await request.patch<CreatePostData, ResData<Post>>(
		'/posts/' + id,
		data,
		{
			headers: { Authorization: accessToken },
		}
	)

	return res?.data
}

export const deletePost = async (id: string, accessToken: string) => {
	const res = await request.delete<ResData<Post>>('/posts/' + id, {
		headers: { Authorization: accessToken },
	})

	return res?.data
}

export const addReaction = async (
	postId: string,
	reaction: CounterObject,
	accessToken: string
) => {
	const res = await request.patch(`/posts/${postId}/add-reaction`, reaction, {
		headers: { Authorization: accessToken },
	})
	return res?.data
}

export const removeReaction = async (
	postId: string,
	reaction: CounterObject,
	accessToken: string
) => {
	const res = await request.patch(
		`/posts/${postId}/remove-reaction`,
		reaction,
		{
			headers: { Authorization: accessToken },
		}
	)
	return res?.data
}
