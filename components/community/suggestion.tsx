import { useQuery } from '@tanstack/react-query'
import { usersService } from '~/apiServices'
import queryKeys from '~/config/queryKeys'
import { useAuth } from '~/hooks'
import Box from '../box'

export default function Suggestion() {
	const { auth } = useAuth()
	const user = auth?.data
	const accessToken = auth?.accessToken

	const { data } = useQuery(queryKeys.suggestion(user?._id as string), () =>
		usersService.getSuggestion(accessToken as string)
	)

    return <Box>
        <h2>Đề cử</h2>
        <div>
            
        </div>
    </Box>
}
