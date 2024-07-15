import { ROUTE } from '@/config/routes.config'

type FooterMenuType = {
	href: string
	label: string
}

export const INFOS: FooterMenuType[] = [
	{
		href: ROUTE.ABOUT,
		label: 'О компании'
	},
	{
		href: ROUTE.POLICY,
		label: 'Политика конфиденциальности'
	}
]

export const SERVICES: FooterMenuType[] = [
	{
		href: ROUTE.SERVICE,
		label: 'Ремонт'
	},
	{
		href: ROUTE.BUYING,
		label: 'Покупка электроники'
	},
	{
		href: ROUTE.ASSEMBLY,
		label: 'Сборка ПК на заказ'
	},
	{
		href: ROUTE.UPGRADING,
		label: 'Обновление парка ПК'
	}
]

export const CONTACTS: FooterMenuType[] = [
	{
		href: 'tel:88482411212',
		label: '8-8482-41-1212 (с 9:30 до 18:00)'
	},
	{
		href: 'mailto:info@bitcom63.ru',
		label: 'info@bitcom63.ru'
	},
	{
		href: 'https://yandex.ru/maps/-/CDbr724l',
		label:
			'бул. Кулибина, 6А, офис №7 (вход со стороны магазина «БИТКОМ»), г. Тольятти, Самарская обл., 445047'
	}
]
