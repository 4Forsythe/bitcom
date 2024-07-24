import { api } from '@/api/interceptors/api-instance'

import type {
	ProductCharacteristicType,
	ProductCharacteristicsType
} from '@/types/product.types'

class CategoryService {
	private endpoint = '/product-category'

	async getAll(): Promise<ProductCharacteristicsType> {
		const response = await api.get(this.endpoint)
		return response.data
	}

	async getOne(id: number): Promise<ProductCharacteristicType> {
		const response = await api.get(`${this.endpoint}/${id}`)
		return response.data
	}
}

export const categoryService = new CategoryService()
