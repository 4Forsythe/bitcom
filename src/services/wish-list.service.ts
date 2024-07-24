import { api, apiWithHeaders } from '@/api/interceptors/api-instance'

import type { WishListType } from '@/types/wish-list.types'

class WishListService {
	private endpoint = '/wish-list'

	async toggle(id: string): Promise<WishListType> {
		const response = await apiWithHeaders.post<WishListType>(
			`${this.endpoint}/${id}`
		)

		return response.data
	}

	async getAll(): Promise<WishListType> {
		const response = await apiWithHeaders.get<WishListType>(
			`${this.endpoint}/me`
		)

		return response.data
	}

	async getCount(): Promise<number> {
		const response = await apiWithHeaders.get<number>(
			`${this.endpoint}/me/count`
		)

		return response.data
	}

	async reset(): Promise<WishListType> {
		const response = await apiWithHeaders.delete<WishListType>(this.endpoint)

		return response.data
	}
}

export const wishListService = new WishListService()
