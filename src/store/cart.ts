import { create } from 'zustand'

import type { CartType, CartItemType } from '@/types/cart.types'

interface ICartState {
	items: CartItemType[]
	count: number
	total: number
	setCart: (data: CartType) => void
}

export const useCartStore = create<ICartState>((set) => ({
	items: [],
	count: 0,
	total: 0,
	setCart: (data) => set(() => ({ ...data }))
}))
