const queryKeys = {
	newBlogs: ['blogs', 'new'],
	blogsGroupByCategories: ['blogs', 'group-by-categories'],
	topUsers: ['users', 'top'],
	refreshToken: ['refresh-token'],
	categories: ['categories'],
	weather: ['weather'],

	pinnedBlogs: (limit: number | false = false) => ['blogs', 'pinned', limit],
	blog: (slug: string) => ['blog', slug],
	followingsBlogs: (id: string) => ['blogs', 'followings', id],
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
}

export default queryKeys
