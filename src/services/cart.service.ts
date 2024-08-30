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

	createCookie(data: CartItemFormType) {
		const cookie = this.getCookie()

		const items: CartItemFormType[] = []
		items.push(data)

		const cart = JSON.stringify(items)

		Cookies.set(this.COOKIE_KEY, cart, { expires: 14 })
	}

	async getAll(): Promise<CartType> {
		const response = await apiWithHeaders.get(`${this.endpoint}/me`)

		return response.data
	}

	async getCookie(): Promise<CartType> {
		const cookie = Cookies.get(this.COOKIE_KEY)

		if (cookie) {
			const items: CartItemType[] = JSON.parse(cookie)

			const ids = items.map((item) => item.id)
			const products = await productService.getByIds(ids)

			const count = products.items.reduce((acc, item) => acc + item.count, 0)
			const total = products.items.reduce((acc, item) => {
				const product = products.items.find((p) => p.id === item.id)
				return acc + (product ? product.price * item.count : 0)
			}, 0)

			const cart = items.map((item) => {
				const product = products.items.find((p) => p.id === item.id)

				return {
					id: item.id,
					product: product!,
					productId: item.id,
					count: item.count
				}
			})

			console.log(cart)

			return { items: cart, count, total }
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

	async updateCookie(
		id: string,
		data: CartItemFormType
	): Promise<CartItemType> {
		const cookie = await this.getCookie()

		const index = cookie.items.findIndex((item) => item.productId === id)

		if (cookie && index !== -1) {
			const item = {
				...cookie.items[index],
				...data,
				id: cookie.items[index].id,
				product: cookie.items[index].product,
				productId: id
			}

			const count = cookie.items.reduce((acc, item) => acc + item.count, 0)
			const total = cookie.items.reduce(
				(acc, item) => acc + item.count * item.product.price,
				0
			)

			const cart = JSON.stringify({ ...cookie, count, total })

			Cookies.set(this.COOKIE_KEY, cart, { expires: 14 })

			return item
		}

		return Promise.reject()
	}

	async remove(id: string) {
		const response = await apiWithHeaders.delete<CartType>(
			`${this.endpoint}/${id}`
		)
	}

	removeCookie(id: string) {
		const cookie = Cookies.get(this.COOKIE_KEY)

		if (cookie) {
			const items: CartItemType[] = JSON.parse(cookie)

			console.log('input', items)

			const response = items.filter((item) => item.id !== id)

			console.log('output', response)

			Cookies.set(this.COOKIE_KEY, JSON.stringify(response), { expires: 14 })
		}
	}

	async reset(): Promise<CartType> {
		const response = await apiWithHeaders.delete<CartType>(this.endpoint)

		return response.data
	}

	resetCookie() {
		Cookies.remove(this.COOKIE_KEY)
	}
}

export const cartService = new CartService()
