import React from 'react'

import {
	SearchBar,
	Pagination,
	PostCard,
	EmptyBlock,
	PostSortBar
} from '@/components'

import type { PostType } from '@/types/post.types'

import styles from './post-list.module.scss'

interface IPostList {
	items: PostType[]
}

export const PostList: React.FC<IPostList> = ({ items }) => {
	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				<div className={styles.list}>
					{items.length > 0 ? (
						items.map((item) => (
							<PostCard
								key={item.slug}
								{...item}
							/>
						))
					) : (
						<EmptyBlock title='К сожалению, ни одна статья не найдена. В скором времени мы обязательно что-нибудь напишем!' />
					)}
				</div>
				{items.length > 0 && <Pagination total={items.length} />}
			</div>
		</div>
	)
}
