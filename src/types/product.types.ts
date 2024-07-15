import { CategoryType } from './category.types'
import { DeviceType } from './device.types'

export type ProductType = {
	id: string
	name: string
	price: number
	count: number
	barcodes: string
	category?: CategoryType
	device?: DeviceType
	brand?: string
	model?: string
}

export type ProductsType = {
	items: ProductType[]
	count: number
}

export type ProductParams = {
	id?: string
	name?: string
	categoryId?: string
	deviceId?: string
	brandId?: string
	modelId?: string
	sortBy?: string
	orderBy?: string
	take?: number
	skip?: number
}
