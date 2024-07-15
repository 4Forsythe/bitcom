import { Post } from '@/components/Post'
import { postService } from '@/services/post.service'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Post'
}

export default async function PostPage({ params }: { params: { id: string } }) {
	const post = await postService.getOne(params.id)

	return <Post {...post} />
}
