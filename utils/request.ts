import axios, { AxiosRequestConfig } from 'axios'

export interface ResData<Data = any> {
	message: string
	data: Data
}

export interface Error {
	message: string
	errorCode: string
}

function errorHandler(error: any) {
	if (axios.isAxiosError(error)) {
		throw <Error>error.response?.data
	}
}

const axiosRequest = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	withCredentials: true,
})

const get = async <Data = any>(url: string, options?: AxiosRequestConfig) => {
	try {
		const res = await axiosRequest.get<Data>(url, options)
		return res.data
	} catch (error) {
		errorHandler(error)
	}
}

const post = async <Data = any, Res = ResData>(
	url: string,
	data: Data,
	options?: AxiosRequestConfig
) => {
	try {
		const res = await axiosRequest.post<Res>(url, data, options)
		return res.data
	} catch (error) {
		errorHandler(error)
	}
}

const patch = async <Data = any, Res = ResData>(
	url: string,
	data: Data,
	options?: AxiosRequestConfig
) => {
	try {
		const res = await axiosRequest.patch<Res>(url, data, options)
		return res.data
	} catch (error) {
		errorHandler(error)
	}
}

const _delete = async <Data = ResData>(
	url: string,
	options?: AxiosRequestConfig
) => {
	try {
		const res = await axiosRequest.delete<Data>(url, options)
		return res.data
	} catch (error) {
		errorHandler(error)
	}
}

const request = { get, post, patch, delete: _delete }

export default request
