import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'
import { Cart } from './Cart'

export const metadata: Metadata = {
	title: 'Корзина'
}

export default function CartPage() {
	return (
		<>
			<Heading title='Корзина' />
			<Cart />
		</>
	)
}
