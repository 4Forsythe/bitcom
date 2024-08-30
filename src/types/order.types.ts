import { ProductType } from './product.types'

export enum GettingType {
	PICKUP = 'Самовывоз'
}

export enum PaymentType {
	CASH = 'При получении',
	ONLINE = 'Онлайн'
}

export type OrderItemType = {
	id: string
	product: string
	productId: string
	count: number
}

type CustomerType = {
	name: string
	email: string
	phone: string
}

export type OrderFormType = {
	customerName: string
	customerEmail: string
	customerPhone: string
	address?: string
	productId: string
	getting: GettingType
	payment: PaymentType
}

export type OrderType = {
	id: string
	customer: CustomerType
	product: ProductType
	count: number
	total: number
}
