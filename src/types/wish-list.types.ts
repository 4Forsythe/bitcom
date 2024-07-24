import { ProductType } from './product.types'

export type WishListItemType = {
	id: string
	product: ProductType
}

export type WishListItemFormType = {
	productId: string
}

export type WishListType = {
	items: WishListItemType[]
	count: number
}
