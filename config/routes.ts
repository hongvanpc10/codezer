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
	directLinkAds:
		'https://www.highrevenuegate.com/bpeeuhun?key=0e06dd1c2a3b0d469ef473461ef05363',
}

export default routes
