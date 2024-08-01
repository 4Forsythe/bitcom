import { BannerProps } from '@/components/Banner'
import { MessagesSquare } from 'lucide-react'

export const BANNERS: BannerProps[] = [
	{
		title: 'Уважаемые пользователи!',
		description:
			'Мы ради сообщить о том, что запустили наш новый сайт!<br/>К сожалению, часть функционала может быть временно недоступна. Мы будем очень признательны за вашу обратную связь и предложения, присланные на почту info@bitcom63.ru.<br/>Приносим извинения за временные неудобства.',
		icon: MessagesSquare,
		color: '#DC2626'
	}
]
