import { DefaultSeoProps } from 'next-seo'

const seoConfig: DefaultSeoProps = {
	defaultTitle: 'Codezer',
	description:
		'Trang web này là một nơi chia sẻ kiến thức và kinh nghiệm lập trình dành cho mọi người. Nó cung cấp một nền tảng để các nhà lập trình có thể chia sẻ bài viết của họ với mọi người và học hỏi từ những người khác. Tại đây, bạn sẽ tìm thấy các bài viết chất lượng về các chủ đề liên quan đến lập trình, bao gồm cả các kiến thức cơ bản và nâng cao.',
	openGraph: {
		type: 'website',
		url: 'https://codezer.online',
		title: 'Codezer',
		description:
			'Trang web này là một nơi chia sẻ kiến thức và kinh nghiệm lập trình dành cho mọi người. Nó cung cấp một nền tảng để các nhà lập trình có thể chia sẻ bài viết của họ với mọi người và học hỏi từ những người khác. Tại đây, bạn sẽ tìm thấy các bài viết chất lượng về các chủ đề liên quan đến lập trình, bao gồm cả các kiến thức cơ bản và nâng cao.',
	},
	twitter: {
		cardType: 'summary_large_image',
	},
}

export default seoConfig
