import request, { ResData } from '~/utils/request'
import { User } from './usersService'

export interface RegisterData {
	fullName: string
	email: string
	password: string
}

export const register = async (data: RegisterData) => {
	const res = await request.post<RegisterData>('/auth/register', data)
	return res?.data
}

export const active = async (token: string) => {
	const res = await request.post<{ token: string }>('/auth/active', {
		token,
	})
	return res
}

export interface LoginData {
	email: string
	password: string
}



export interface ResDataWithAccessToken extends ResData<User> {
	accessToken: string
}

export const login = async (data: LoginData) => {
	const res = await request.post<LoginData, ResDataWithAccessToken>(
		'/auth/login',
		data
	)
	return res
}

export const refreshToken = async () => {
	const res = await request.get<ResDataWithAccessToken>('/auth/refresh-token')
	return res
}

export const logout = async () => {
	const res = await request.get('/auth/logout')
	return res
}

export const googleLogin = async (code: string) => {
	const res = await request.post<{ code: string }, ResDataWithAccessToken>(
		'/auth/login/google',
		{
			code,
		}
	)
	return res
}

interface FacebookLoginData {
	accessToken: string
	userID: string
}

export const facebookLogin = async (data: FacebookLoginData) => {
	const res = await request.post<FacebookLoginData, ResDataWithAccessToken>(
		'/auth/login/facebook',
		data
	)
	return res
}
