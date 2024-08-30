import { api, apiWithHeaders } from '@/api/interceptors/api-instance'
import type {
	DiscountType,
	DiscountsType,
	DiscountParams
} from '@/types/discount.types'
import { EmailFormType } from '@/types/email.types'
import { OrderFormType, OrderType } from '@/types/order.types'

class OrderService {
	private endpoint = '/order'

	async create(data: OrderFormType): Promise<OrderType> {
		const response = await apiWithHeaders.post(this.endpoint, data)

		return response.data
	}
}

export const orderService = new OrderService()
