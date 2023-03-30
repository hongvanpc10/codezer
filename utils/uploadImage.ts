import axios from 'axios'

export default async function uploadImage(file: File) {
	const formData = new FormData()
	formData.append('file', file)
	formData.append('upload_preset', 'gdr70naw')

	const res = await axios.post(
		String(process.env.NEXT_PUBLIC_CLOUDINARY_API_URL),
		formData
	)

	return res.data.secure_url
}
