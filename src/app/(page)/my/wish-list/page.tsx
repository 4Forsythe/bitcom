import type { Metadata } from 'next'

import { WishList } from './WishList'
import { Heading } from '@/components/ui/Heading'

export const metadata: Metadata = {
	title: 'Список желаемого'
}

export default function WishListPage() {
	return (
		<>
			<Heading title='Список желаемого' />
			<WishList />
		</>
	)
}
