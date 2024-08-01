import type { Metadata } from 'next'

import { convert } from 'html-to-text'

import { Post } from '@/app/(page)/blog/[id]/Post'

import { postService } from '@/services/post.service'
import { redirect } from 'next/navigation'
import { ROUTE } from '@/config/routes.config'

const getPost = async (id: string) => {
	const data = await postService.getOne(id)

	if (!data) redirect(ROUTE.BLOG)

	return data
}

export const generateMetadata = async ({ params }: PostPageProps) => {
	const post = await getPost(params.id)

	return {
		title: post.title,
		description: `${post.title} — читать статью на техноблоге «БитКом». ${`${new Date(post.updatedAt).toLocaleString()}, ${post.views} просмотров.`} Читать самые последние статьи о промышленной и электронной технике.`
	}
}

export const revalidate = 60

interface PostPageProps {
	params: { id: string }
}

export default async function PostPage({ params }: PostPageProps) {
	const post = await getPost(params.id)

	return <Post {...post} />
}
