import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Eye } from 'lucide-react'

import { ROUTE } from '@/config/routes.config'
import { calcNounDate } from '@/utils/calc-noun-date'

import type { PostType } from '@/types/post.types'

import styles from './PostCard.module.scss'
import { formatDate } from '@/utils/format-date'

export const PostCard = ({
	id,
	title,
	content,
	imageUrl,
	views,
	createdAt,
	updatedAt
}: PostType) => {
	const isUpdated = formatDate(createdAt) !== formatDate(updatedAt)

	return (
		<article className={styles.container}>
			<Link
				className={styles.cover}
				href={`${ROUTE.BLOG}/${id}`}
			>
				<Image
					className={styles.image}
					width={1000}
					height={1000}
					src={imageUrl || '/images/image-placeholder.png'}
					alt={title}
					priority
				/>
			</Link>
			<div className={styles.information}>
				<Link
					className={styles.title}
					href={`${ROUTE.BLOG}/${id}`}
				>
					{title}
				</Link>
				<div className={styles.details}>
					<span className={styles.timestamp}>
						{isUpdated
							? `Изменено ${calcNounDate(updatedAt)}`
							: `Опубликовано ${calcNounDate(createdAt)}`}
					</span>
					<span className={styles.views}>
						<Eye className={styles.icon} />
						{views}
					</span>
				</div>
				<p className={styles.description}>{content}</p>
			</div>
		</article>
	)
}
