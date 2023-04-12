import { CounterObject } from '@charkour/react-reactions'
import request, {
	Params,
	ResData,
	ResDataWithPagination
} from '~/utils/request'
import { User } from './usersService'

export interface CommentData {
	content: string
}

export interface Comment extends CommentData {
	author: User
	_id: string
	createdAt: string
	tag?: User
	content: string
	reactions: CounterObject
}

export const create = async (
	blogId: string,
	data: CommentData,
	accessToken: string
) => {
	const res = await request.post<CommentData, ResData<Comment>>(
		'/comments/' + blogId,
		data,
		{
			headers: { Authorization: accessToken },
		}
	)

	return res?.data
}

export const get = async (blogId: string, params?: Params) => {
	const res = await request.get<
		ResDataWithPagination<{ comments: Comment[] }>
	>('/comments/' + blogId, { params })

	return res?.data
}
