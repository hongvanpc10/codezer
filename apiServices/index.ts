export interface Params {
	limit?: number
	page?: number
	sort?: string
	order?: number
}

export * as authService from './authService'
export * as blogsService from './blogsService'
export * as categoriesService from './categoriesService'
export { default as chatCompletion } from './chatGPTService'
export * as usersService from './usersService'
export { default as getWeatherData } from './weatherService'

