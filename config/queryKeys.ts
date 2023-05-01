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
	followingsBlogs: (...params: (string | number | undefined)[]) => [
		'blogs',
		'followings',
		...params,
	],
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
	searchPosts: (query: string, params?: {}) => [
		'search',
		query,
		'posts',
		params,
	],
	posts: ['posts'],
	followingsPosts: (id: string) => ['followings', 'posts', id],
	userPosts: (id: string) => ['posts', 'user', id],
	suggestion: (id: string) => ['users', 'suggestion', id],
	savedBlogs: (id: string) => ['blogs', 'saved', id],
	savedPosts: (id: string) => ['posts', 'saved', id],
	postDetail: (id: string) => ['posts', id, 'post'],
}

export default queryKeys
