import { create } from 'zustand'

import type { WishlistType, WishlistItemType } from '@/types/wishlist.types'

interface IWishlistState {
	items: WishlistItemType[]
	setWishlist: (data: WishlistType) => void
}

export const useWishlistStore = create<IWishlistState>((set) => ({
	items: [],
	setWishlist: (data) => set(() => ({ ...data }))
}))
