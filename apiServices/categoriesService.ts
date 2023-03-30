import request, { ResData } from '~/utils/request'

export interface CategoryData {
	name: string
	description: string
}

export interface Category extends CategoryData {
	_id: string
	slug: string
}

export const get = async () => {
	const res = await request.get<ResData<Category[]>>('/categories')

	return res?.data
}

export const create = async (data: CategoryData, accessToken: string) => {
	const res = await request.post<CategoryData, ResData<Category>>(
		'/categories',
		data,
		{ headers: { Authorization: accessToken } }
	)

	return res?.data
}

export const update = async (
	id: string,
	data: CategoryData,
	accessToken: string
) => {
	const res = await request.patch<CategoryData, ResData<Category>>(
		'/categories/' + id,
		data,
		{ headers: { Authorization: accessToken } }
	)

	return res?.data
}

export const deleteCat = async (id: string, accessToken: string) => {
	const res = await request.delete<ResData<Category>>('/categories/' + id, {
		headers: { Authorization: accessToken },
	})

	return res?.data
}
