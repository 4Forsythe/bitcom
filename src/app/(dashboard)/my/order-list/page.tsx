import type { Metadata } from 'next'

import { Heading, OrderList } from '@/components'

import { NO_INDEX } from '@/constants'

export const metadata: Metadata = {
	title: 'Заказы',
	...NO_INDEX
}

export default async function OrdersPage() {
	return (
		<>
			<Heading title='Заказы' />
			<OrderList />
		</>
	)
}