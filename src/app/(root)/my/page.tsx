import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'
import { Profile } from './Profile'
import { NO_INDEX } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Личный кабинет',
	...NO_INDEX
}

export default function ProfilePage() {
	return (
		<>
			<Heading title='Личный кабинет' />
			<Profile />
		</>
	)
}
