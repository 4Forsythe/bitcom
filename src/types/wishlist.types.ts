import { ProductType } from './product.types'

export type WishlistItemType = {
	id: string
	product: ProductType
}

export type WishlistItemFormType = {
	productId: string
}

export type WishlistType = {
	items: WishlistItemType[]
}
