import { ProductType } from './product.types'

export type CartItemType = {
	id: string
	product: ProductType
	count: number
}

export type CartItemFormType = {
	productId: string
	count: number
}

export type CartType = {
	items: CartItemType[]
	count: number
	total: number
}
