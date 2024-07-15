import { type LucideIcon, ShoppingCart, Heart } from 'lucide-react'

import { ROUTE } from '@/config/routes.config'

interface MenuItem {
	title: string
	icon: LucideIcon
	href: string
}

export const MENU: MenuItem[] = [
	{
		title: 'Корзина',
		icon: ShoppingCart,
		href: ROUTE.CART
	},
	{
		title: 'Желаемое',
		icon: Heart,
		href: ROUTE.WISHLIST
	}
]
