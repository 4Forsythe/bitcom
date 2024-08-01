import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'
import { PostList } from '@/components/PostList'
import { postService } from '@/services/post.service'
import { getSearchParams } from '@/utils/get-search-params'

const getPosts = async (searchParams?: {
	[key: string]: string | undefined
}) => {
	const { sortBy, orderBy, page, limit } = getSearchParams(searchParams)

	return postService.getAll({
		sortBy,
		orderBy,
		take: limit,
		skip: (page - 1) * limit
	})
}

export const generateMetadata = async ({ searchParams }: BlogPageProps) => {
	const data = await getPosts(searchParams)

	if (!data) {
		return {
			title: 'Техноблог «БитКом» — самое интересное в мире техники'
		}
	}

	const items = data.items.map((item) => item.title).join(', ')

	return {
		title: 'Техноблог «БитКом» — самое интересное в мире техники',
		description: `Читать самые последние статьи на техноблоге «БитКом» о промышленной и электронной технике. ${items}. Всего ${data.count} шт.`
	}
}

export const revalidate = 60

interface BlogPageProps {
	searchParams?: { [key: string]: string | undefined }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
	const data = await getPosts(searchParams)

	return (
		<>
			<Heading
				title='Блог'
				control
			/>
			<PostList posts={data} />
		</>
	)
}
