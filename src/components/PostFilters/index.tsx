'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import clsx from 'clsx'
import { ChevronUp } from 'lucide-react'

import { ROUTE } from '@/config/routes.config'

import { formatCase } from '@/utils/format-case'

import { FILTERS } from './post-filters.data'

import styles from './PostFilters.module.scss'

export const PostFilters = () => {
	const pathname = usePathname()

	const [isTarget, setIsTarget] = React.useState<{ [key: string]: boolean }>({
		categories: true
	})

	const onToggle = (tab: string) => {
		setIsTarget((prev) => ({ ...prev, [tab]: !prev[tab] }))
	}

	return (
		<div className={styles.wrap}>
			<div className={styles.container}>
				<div
					className={clsx(styles.dropdown, {
						[styles.collapsed]: !isTarget.categories
					})}
				>
					<button
						className={styles.super}
						onClick={() => onToggle('categories')}
					>
						<ChevronUp className={styles.icon} /> Категории
					</button>
					<div className={styles.group}>
						{FILTERS?.map((item) => (
							<Link
								className={clsx(styles.item, styles.target)}
								href={`${ROUTE.BLOG}/${item.property}`}
								key={item.property}
							>
								{formatCase(item.name)}
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
