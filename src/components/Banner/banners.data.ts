import { BannerProps } from '@/components/Banner'
import { MessagesSquare } from 'lucide-react'

export const BANNERS: BannerProps[] = [
	{
		title: 'Уважаемые пользователи!',
		description:
			'Мы ради сообщить о том, что запустили наш новый сайт!<br/>В связи с этим событием, часть функционала может быть временно недоступна. Мы также будем очень признательны за вашу обратную связь по почте bitcom63@yandex.ru.<br/>Приносим извинения за временные неудобства.',
		icon: MessagesSquare,
		color: '#DC2626'
	}
]
