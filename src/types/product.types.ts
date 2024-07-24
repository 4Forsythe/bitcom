export type ProductCharacteristicType = {
	id: string
	name: string
}

export type ProductCharacteristicsType = {
	items: ProductCharacteristicType[]
	count: number
}

export type ProductCharacteristicParamsType = {
	take?: number
	skip?: number
}

export type ProductType = {
	id: string
	name: string
	price: number
	count: number
	barcode: string
	category?: ProductCharacteristicType
	device?: ProductCharacteristicType
	brand?: ProductCharacteristicType
	model?: ProductCharacteristicType
}

export type ProductsType = {
	items: ProductType[]
	count: number
}

export type ProductParamsType = {
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
