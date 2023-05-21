const postsBackgrounds = Array.from(Array(10)).map((_, i) =>
	require(`./${i + 1}.jpg`)
)

export default postsBackgrounds
