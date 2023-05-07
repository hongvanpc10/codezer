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
	posts: '/posts',
	followingsBlogs: '/blogs/followings',
	savedBlogs: '/blogs/saved',
	postsByTag: (tag: string) => '/posts/tag/' + tag,
	postDetail: (id: string) => '/posts/' + id,
	directLinkAds: '//vaikijie.net/4/5930674',
}

export default routes
