import { api } from '@/api/interceptors/api-instance'

import type {
	ProductType,
	ProductsType,
	ProductParamsType
} from '@/types/product.types'

class ProductService {
	private endpoint = '/product'

	async getAll(params?: ProductParamsType): Promise<ProductsType> {
		const response = await api.get(this.endpoint, { params })
		return response.data
	}

	async getOne(id: string): Promise<ProductType> {
		const response = await api.get(`${this.endpoint}/${id}`)
		return response.data
	}
}

export const productService = new ProductService()
