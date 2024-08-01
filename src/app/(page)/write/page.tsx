import type { Metadata } from 'next'
import { cookies } from 'next/headers'

import { Heading } from '@/components/ui/Heading'
import { WriteForm } from '@/app/(page)/write/WriteForm'
import { userService } from '@/services/user.service'
import { redirect } from 'next/navigation'
import { NO_INDEX } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Написать статью',
	...NO_INDEX
}

export default async function WritePage() {
	// try {
	// 	const token = cookies().get('accessToken')?.value
	// 	const user = await userService.getProfile(token)

	// 	if (!user || !user.role) redirect('/')
	// } catch (error) {
	// 	console.error('Failed get user data:', error)
	// 	redirect('/')
	// }

	return (
		<>
			<Heading
				title='Написать статью'
				control
			/>
			<WriteForm />
		</>
	)
}
