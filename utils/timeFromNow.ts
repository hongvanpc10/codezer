import moment from 'moment'
import 'moment/locale/vi'

moment.locale('vi')

export default function timeFromNow(date: string, detailed?: boolean) {
	const daysDiff = -moment(date).diff(new Date(), 'd')
	const time = moment(date).format('H:mm')

	return detailed
		? daysDiff === 0
			? moment(date).fromNow()
			: daysDiff === 1
			? `Hôm qua lúc ${time}`
			: daysDiff < 7
			? `${moment(date).format('ddd')} lúc ${time}`
			: `${moment(date).format('D')} thg ${moment(date).format(
					'M'
			  )} lúc ${time}`
		: moment(date).fromNow()
}
