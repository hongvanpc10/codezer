import { io } from 'socket.io-client'

const socket = io(`${process.env.NEXT_PUBLIC_API_BASE_URL}`.slice(0, -4))

export default socket
