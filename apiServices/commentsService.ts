import { CounterObject } from '@charkour/react-reactions'
import request, {
	Params,
	ResData,
	ResDataWithPagination,
} from '~/utils/request'
import { User } from './usersService'

export interface CommentData {
	content: string
	tag?: string
}

export interface Comment {
	author: User
	_id: string
	createdAt: string
	tag?: User
	content: string
	reactions: CounterObject[]
	children: Comment[]
	parent: string
	post: string
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
		ResDataWithPagination<{ comments: Comment[]; allCount: number }>
	>('/comments/' + blogId, { params })

	return res?.data
}

export const reply = async (
	commentId: string,
	data: CommentData,
	accessToken: string
) => {
	const res = await request.post<CommentData, ResData<Comment>>(
		'comments/reply/' + commentId,
		data,
		{
			headers: { Authorization: accessToken },
		}
	)

	return res?.data
}

export const addReaction = async (
	commentId: string,
	reaction: CounterObject,
	accessToken: string
) => {
	const res = await request.patch(
		`/comments/${commentId}/add-reaction`,
		reaction,
		{
			headers: { Authorization: accessToken },
		}
	)
	return res?.data
}

export const removeReaction = async (
	commentId: string,
	reaction: CounterObject,
	accessToken: string
) => {
	const res = await request.patch(
		`/comments/${commentId}/remove-reaction`,
		reaction,
		{
			headers: { Authorization: accessToken },
		}
	)
	return res?.data
}

export const update = async (
	id: string,
	data: { content: string },
	accessToken: string
) => {
	const res = await request.patch('/comments/' + id, data, {
		headers: { Authorization: accessToken },
	})

	return res?.data
}

export const deleteComment = async (
	id: string,
	accessToken: string
) => {
	const res = await request.delete('/comments/' + id, {
		headers: { Authorization: accessToken },
	})

	return res?.data
}
