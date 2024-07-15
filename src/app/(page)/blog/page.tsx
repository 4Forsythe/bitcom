import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'
import { PostList } from '@/components/PostList'
import { postService } from '@/services/post.service'
import { getSearchParams } from '@/utils/get-search-params'

export const metadata: Metadata = {
	title: 'Статьи'
}

interface BlogPageProps {
	params: { id: string }
	searchParams?: { [key: string]: string | undefined }
}

export default async function BlogPage({
	params,
	searchParams
}: BlogPageProps) {
	const { id } = params
	const { sortBy, orderBy, page, limit } = getSearchParams(searchParams)

	const posts = await postService.getAll({
		sortBy,
		orderBy,
		take: limit,
		skip: (page - 1) * limit
	})

	return (
		<>
			<Heading title='Блог' />
			<PostList posts={posts} />
		</>
	)
}
