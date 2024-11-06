import type { Metadata } from 'next'

import { Heading, OrderList } from '@/components'

import { NO_INDEX } from '@/constants/seo.constants'
import { getSearchParams } from '@/utils/get-search-params'
import { orderService } from '@/services/order.service'

export const metadata: Metadata = {
	title: 'Заказы',
	...NO_INDEX
}

// const getOrders = async (searchParams: {
// 	[key: string]: string | undefined
// }) => {
// 	const { page, limit } = getSearchParams(searchParams)

// 	return orderService.getAll({
// 		take: limit,
// 		skip: (page - 1) * limit
// 	})
// }

interface IOrdersPageProps {
	searchParams: { [key: string]: string | undefined }
}

export default async function OrdersPage({ searchParams }: IOrdersPageProps) {
	// const orders = await getOrders(searchParams)

	return (
		<>
			<Heading title='Заказы' />
			<OrderList />
		</>
	)
}
