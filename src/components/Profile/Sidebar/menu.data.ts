import type { LucideIcon } from 'lucide-react'
import { Package, CakeSlice, User } from 'lucide-react'

import { ROUTE } from '@/config/routes.config'

type SidebarMenuType = {
	href: string
	icon: LucideIcon
	label: string
}

export const PUBLIC_MENU: SidebarMenuType[] = [
	{
		href: ROUTE.PROFILE,
		icon: User,
		label: 'Аккаунт'
	},
	{
		href: ROUTE.ORDERLIST,
		icon: Package,
		label: 'Заказы'
	},
	{
		href: ROUTE.WISHLIST,
		icon: CakeSlice,
		label: 'Желаемое'
	}
]