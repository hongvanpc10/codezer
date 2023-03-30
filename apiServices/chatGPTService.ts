import { ChatCompletionRequestMessage } from 'openai'
import { openai } from '~/config/chatGPTConfig'

export default async function chatCompletion(
	messages: ChatCompletionRequestMessage[]
) {
	try {
		const res = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: messages,
			max_tokens: 500,
			temperature: 0.5,
		})

		return res.data.choices[0].message
	} catch (error) {}
}
