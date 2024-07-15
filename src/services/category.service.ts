import { api } from '@/api/interceptors/api-instance'

import type { CategoryType, CategoriesType } from '@/types/category.types'

class CategoryService {
	private endpoint = '/product-category'

	async getAll(): Promise<CategoriesType> {
		const response = await api.get(this.endpoint)
		return response.data
	}

	async getOne(id: number): Promise<CategoryType> {
		const response = await api.get(`${this.endpoint}/${id}`)
		return response.data
	}
}

export const categoryService = new CategoryService()
