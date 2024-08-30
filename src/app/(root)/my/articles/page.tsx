import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'
import { Articles } from './Articles'

import { NO_INDEX } from '@/constants/seo.constants'

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
