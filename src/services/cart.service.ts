import { api, apiWithHeaders } from '@/api/interceptors/api-instance'

import Crypto from 'crypto-js'
import Cookies from 'js-cookie'

import type {
	CartItemType,
	CartItemFormType,
	CartType
} from '@/types/cart.types'
import { productService } from './product.service'
import { ProductsType, ProductType } from '@/types/product.types'

class CartService {
	private endpoint = '/cart'
	private COOKIE_KEY = 'cart'

	async create(data: CartItemFormType): Promise<CartType> {
		const response = await apiWithHeaders.post<CartType>(this.endpoint, data)

		return response.data
	}

	setCookie(data: ProductType) {
		const cookie = this.getCookie()

		const cart = JSON.stringify(data)

		Cookies.set(this.COOKIE_KEY, cart, { expires: 14 })
	}

	async getAll(): Promise<CartType> {
		const response = await apiWithHeaders.get(`${this.endpoint}/me`)

		return response.data
	}

	getCookie(): CartType {
		const cookie = Cookies.get(this.COOKIE_KEY)

		if (cookie) {
			const response = JSON.parse(cookie)

			console.log('cookie', cookie)

			return response
		}

		return { items: [], count: 0, total: 0 }
	}

	async getCount(): Promise<number> {
		const response = await apiWithHeaders.get<number>(
			`${this.endpoint}/me/count`
		)

		return response.data
	}

	async update(id: string, data: CartItemFormType): Promise<CartItemType> {
		const response = await apiWithHeaders.patch<CartItemType>(
			`${this.endpoint}/${id}`,
			data
		)

		return response.data
	}

	async remove(id: string): Promise<CartType> {
		const response = await apiWithHeaders.delete<CartType>(
			`${this.endpoint}/${id}`
		)

		return response.data
	}

	removeCookie() {
		Cookies.remove(this.COOKIE_KEY)
	}

	async reset(): Promise<CartType> {
		const response = await apiWithHeaders.delete<CartType>(this.endpoint)

		return response.data
	}
}

export const cartService = new CartService()
