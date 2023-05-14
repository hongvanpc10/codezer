const postsBackgrounds = Array.from(Array(13)).map((_, i) =>
	require(`./${i + 1}.jpg`)
)

export default postsBackgrounds
