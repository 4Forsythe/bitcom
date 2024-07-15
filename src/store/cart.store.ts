import { create } from 'zustand'

import type { UserType } from '@/types/user.types'
import { CartItemFormType, CartItemType, CartType } from '@/types/cart.types'
import { useCart } from '@/hooks/useCart'
import { useQuery } from '@tanstack/react-query'
import { cartService } from '@/services/cart.service'
import { useCreateCart } from '@/hooks/useCreateCart'

interface CartStateProps {
	cart: CartType
	setCart: (user: CartType) => void
}

export const useCartStore = create<CartStateProps>((set) => ({
	cart: { items: [], count: 0 },
	setCart: (data) => set(() => ({ cart: data }))
}))
