'use client'

import Link from 'next/link'
import styles from './FeaturesCard.module.scss'
import { ROUTE } from '@/config/routes.config'
import Image from 'next/image'
import { ProductType } from '@/types/product.types'
import { PostType } from '@/types/post.types'
import { calcNounDate } from '@/utils/calc-noun-date'
import { formatDate } from '@/utils/format-date'
import clsx from 'clsx'

export const FeaturesCard = ({ item }: { item: ProductType | PostType }) => {
	if ('price' in item) {
		return (
			<article className={clsx(styles.container, 'animate-opacity')}>
				<Link
					className={styles.cover}
					href={`${ROUTE.PRODUCT}/${item.id}`}
				>
					<Image
						className={styles.image}
						width={200}
						height={200}
						src={'/static/image-placeholder.png'}
						alt={item.name}
						priority
					/>
				</Link>
				<div className={styles.information}>
					<Link
						className={styles.name}
						href={`${ROUTE.PRODUCT}/${item.id}`}
					>
						{item.name}
					</Link>
				</div>
			</article>
		)
	}

	if ('content' in item) {
		const isUpdated = formatDate(item.createdAt) !== formatDate(item.updatedAt)

		return (
			<article className={clsx(styles.container, 'animate-opacity')}>
				<Link
					className={styles.cover}
					href={`${ROUTE.BLOG}/${item.id}`}
				>
					<Image
						className={styles.image}
						width={200}
						height={200}
						src={item.imageUrl || '/static/image-placeholder.png'}
						alt={item.title}
						priority
					/>
				</Link>
				<div className={styles.information}>
					<Link
						className={styles.title}
						href={`${ROUTE.BLOG}/${item.id}`}
					>
						{item.title}
					</Link>
					<div className={styles.details}>
						<span className={styles.views}>{item.views} просмотров</span>
						<span className={styles.timestamp}>
							{isUpdated
								? calcNounDate(item.updatedAt)
								: calcNounDate(item.createdAt)}
						</span>
					</div>
				</div>
			</article>
		)
	}
}
