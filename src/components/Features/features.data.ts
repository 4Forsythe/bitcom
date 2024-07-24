import { ROUTE } from '@/config/routes.config'

type FeaturesType = {
	href: string
	title: string
	description: string
}

export const FEATURES: FeaturesType[] = [
	{
		href: ROUTE.CATALOG,
		title: 'Каталог',
		description: 'Компьютерная и офисная техника, электронное оборудование'
	},
	{
		href: ROUTE.BLOG,
		title: 'Блог',
		description: 'Временные акции и скидки на различные товары'
	},
	{
		href: ROUTE.SERVICE,
		title: 'Сервисный центр',
		description: 'Промышленная электроника, компьютеры и оргтехника'
	},
	{
		href: ROUTE.ASSEMBLY,
		title: 'Сборка компьютеров',
		description: 'Как из абсолютно новых, так и из Б/У комплектующих'
	},
	{
		href: ROUTE.BUYING,
		title: 'Покупка электроники',
		description: 'Электронные комплектующие за реальные деньги'
	},
	{
		href: ROUTE.UPGRADING,
		title: 'Обновление парка ПК',
		description: 'Полное или частичное обновление парка оргтехники'
	}
]
