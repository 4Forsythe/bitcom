import type { Metadata } from 'next'
import { cookies } from 'next/headers'

import { Heading } from '@/components/ui/Heading'
import { WriteForm } from '@/app/(page)/write/WriteForm'
import { userService } from '@/services/user.service'
import { redirect } from 'next/navigation'
import { postService } from '@/services/post.service'
import { NO_INDEX } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Редактировать статью',
	...NO_INDEX
}

export default async function WritePage({
	params
}: {
	params: { id: string }
}) {
	const { id } = params

	const post = await postService.getOne(id)

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
				title='Редактировать статью'
				control
			/>
			<WriteForm post={post} />
		</>
	)
}
