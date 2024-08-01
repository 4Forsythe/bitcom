import { create } from 'zustand'

import type { UserType } from '@/types/user.types'
import type { CartType } from '@/types/cart.types'
import type { WishListType } from '@/types/wish-list.types'

import { cartService } from '@/services/cart.service'
import { wishListService } from '@/services/wish-list.service'

interface UserStateProps {
	user: UserType | null
	cart: CartType | null
	wishList: WishListType | null
	cartCount: number
	wishListCount: number
	setUser: (data: UserType | null) => void
	setCart: (data: CartType) => void
	setWishList: (data: WishListType) => void
	getCartCount: () => Promise<void>
	getWishListCount: () => Promise<void>
}

export const useUserStore = create<UserStateProps>((set) => ({
	user: null,
	cart: null,
	wishList: null,
	cartCount: 0,
	wishListCount: 0,
	setUser: (data) => set(() => ({ user: data })),
	setCart: (data) => set(() => ({ cart: data })),
	setWishList: (data) => set(() => ({ wishList: data })),
	getCartCount: async () => {
		try {
			const count = await cartService.getCount()
			set(() => ({ cartCount: count }))
		} catch (error) {
			console.error(error)
		}
	},
	getWishListCount: async () => {
		try {
			const count = await wishListService.getCount()
			set(() => ({ wishListCount: count }))
		} catch (error) {
			console.error(error)
		}
	}
}))
