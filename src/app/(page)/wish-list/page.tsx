import type { Metadata } from 'next'

import { Heading } from '@/components'
import { Wishlist } from './wishlist'

export const metadata: Metadata = {
	title: 'Список желаемого'
}

export default function WishListPage() {
	return (
		<>
			<Heading
				title='Список желаемого'
				control
			/>
			<Wishlist />
		</>
	)
}
