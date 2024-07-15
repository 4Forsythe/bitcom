import type { Metadata } from 'next'

import { OrderList } from './OrderList'
import { Heading } from '@/components/ui/Heading'

export const metadata: Metadata = {
	title: 'Заказы'
}

export default function OrderListPage() {
	return (
		<>
			<Heading title='Заказы' />
			<OrderList />
		</>
	)
}
