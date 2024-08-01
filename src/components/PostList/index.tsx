'use client'

import { Filters } from '@/components/Filters'
import { Sort } from '@/components/Sort'
import { PostCard } from '@/app/(page)/blog/[id]/PostCard'
import { Pagination } from '@/components/ui/Pagination'
import { EmptyBlock } from '@/components/EmptyBlock'

import type { PostsType } from '@/types/post.types'

import styles from './PostList.module.scss'
import { PostFilters } from '../PostFilters'
import { SearchBar } from '../SearchBar'

interface PostListProps {
	posts: PostsType
}

export const PostList = ({ posts }: PostListProps) => {
	return (
		<div className={styles.container}>
			<aside className={styles.sidebar}>
				<PostFilters />
			</aside>
			<div className={styles.inner}>
				<div className={styles.search}>
					<SearchBar />
				</div>
				<Sort />
				<div className={styles.list}>
					{posts.items.length ? (
						posts.items.map((post) => (
							<PostCard
								key={post.id}
								{...post}
							/>
						))
					) : (
						<EmptyBlock title='К сожалению, статьи выбранной вами категории не были найдены. В скором времени мы обязательно что-нибудь напишем!' />
					)}
				</div>
				{posts.items.length > 0 && <Pagination total={posts.count} />}
			</div>
		</div>
	)
}
