'use client'

import Link from 'next/link'
import Image from 'next/image'

import { ROUTE } from '@/config/routes.config'

import { formatCase } from '@/utils/format-case'

import type { ProductCharacteristicsType } from '@/types/product.types'

import styles from './Catalog.module.scss'

export const Catalog = ({
	categories
}: {
	categories: ProductCharacteristicsType
}) => {
	return (
		<div className={styles.container}>
			{categories.items.map((category) => (
				<Link
					key={category.id}
					href={`${ROUTE.CATALOG}/${category.id}`}
					className={styles.card}
				>
					<div className={styles.cover}>
						<Image
							className={styles.image}
							width={170}
							height={120}
							src={
								category.imageUrl
									? `${process.env.NEXT_PUBLIC_IP_BASE_URL}${category.imageUrl}`
									: '/static/image-placeholder.png'
							}
							alt={category.name}
							priority
						/>
					</div>
					<span className={styles.title}>{formatCase(category.name)}</span>
				</Link>
			))}
		</div>
	)
}
