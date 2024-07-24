import type { Metadata } from 'next'

import { Post } from '@/app/(page)/blog/[id]/Post'

import { postService } from '@/services/post.service'

export const metadata: Metadata = {
	title: 'Post'
}

export default async function PostPage({ params }: { params: { id: string } }) {
	const post = await postService.getOne(params.id)

	return <Post {...post} />
}
