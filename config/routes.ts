const routes = {
	home: '/',
	createBlog: '/create-blog',
	login: '/login',
	blogs: '/blogs',
	search: '/search',
	categories: '/categories',
	register: '/register',
	settings: '/settings',
	profile: (slug: string) => '/@' + slug,
	blog: (slug: string) => '/' + slug,
	editBlog: (slug: string) => '/' + slug + '/edit',
	blogsByCategory: (slug: string) => '/blogs/' + slug,
	pinnedBlogs: '/blogs/pinned',
	community: '/community',
	followingsBlogs: '/blogs/followings',
	savedBlogs: '/blogs/saved',
}

export default routes
