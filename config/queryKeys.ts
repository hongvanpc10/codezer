import { Params } from '~/utils/request'

const queryKeys = {
	newBlogs: ['blogs', 'new'],
	blogsGroupByCategories: ['blogs', 'group-by-categories'],
	topUsers: ['users', 'top'],
	refreshToken: ['refresh-token'],
	categories: ['categories'],
	weather: ['weather'],

	pinnedBlogs: (limit: number | false = false) => ['blogs', 'pinned', limit],
	blog: (slug: string) => ['blog', slug],
	followingsBlogs: (
		limit: number,
		...params: (string | number | undefined)[]
	) => ['blogs', 'followings', limit, ...params],
	blogs: (...params: (string | number | undefined)[]) => ['blogs', ...params],
	blogsByCategory: (
		slug: string,
		...params: (string | number | undefined)[]
	) => ['blogs', slug, ...params],
	editBlog: (slug: string) => ['blog', slug, 'edit'],
	blogsWithSameAuthor: (blog: string, author: string) => [
		'blogs',
		blog,
		author,
	],
	user: (slug: string) => ['user', slug],
	comments: (id: string) => ['comments', id],
	searchBlogs: (query: string, params?: {}) => [
		'search',
		query,
		'blogs',
		params,
	],
	searchUsers: (query: string, params?: {}) => [
		'search',
		query,
		'users',
		params,
	],
	posts: ['posts'],
}

export default queryKeys
