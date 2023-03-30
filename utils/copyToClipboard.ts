export default function copyToClipboard(text: string) {
	navigator && navigator.clipboard.writeText(text)
}
