import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'
import { Profile } from './Profile'

export const metadata: Metadata = {
	title: 'Личный кабинет'
}

export default function ProfilePage() {
	return (
		<>
			<Heading title='Личный кабинет' />
			<Profile />
		</>
	)
}
