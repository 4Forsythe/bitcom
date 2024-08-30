import type { LucideIcon } from 'lucide-react'
import {
	Settings,
	Package,
	CakeSlice,
	Notebook,
	NotebookPen
} from 'lucide-react'

import { ROUTE } from '@/config/routes.config'

type SidebarMenuType = {
	href: string
	icon: LucideIcon
	label: string
}

export const PUBLIC_MENU: SidebarMenuType[] = [
	{
		href: ROUTE.PROFILE,
		icon: Settings,
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

export const PROTECTED_MENU: SidebarMenuType[] = [
	{
		href: ROUTE.ARTICLES,
		icon: Notebook,
		label: 'Статьи'
	},
	{
		href: ROUTE.EDITOR,
		icon: NotebookPen,
		label: 'Написать статью'
	}
]
