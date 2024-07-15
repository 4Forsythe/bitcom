import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'
import { Articles } from './Articles'

export const metadata: Metadata = {
	title: 'Статьи'
}

export default function ProfilePage() {
	return (
		<>
			<Heading title='Статьи' />
			<Articles />
		</>
	)
}
