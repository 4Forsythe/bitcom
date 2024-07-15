'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import clsx from 'clsx'
import { ChevronUp } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { Skeleton } from './Skeleton'

import { ROUTE } from '@/config/routes.config'

import { formatCase } from '@/utils/format-case'

import type { CategoriesType } from '@/types/category.types'
import type { DevicesType } from '@/types/device.types'

import { categoryService } from '@/services/category.service'
import { deviceService } from '@/services/device.service'

import styles from './Filters.module.scss'

interface FilterProps {
	initialCategories?: CategoriesType
	initialTypes?: DevicesType
}

export const Filters = ({ initialCategories, initialTypes }: FilterProps) => {
	const pathname = usePathname()
	const params = useSearchParams()

	const [isTarget, setIsTarget] = React.useState<{ [key: string]: boolean }>({
		categories: true,
		devices: true
	})

	const { data: categories, isLoading: isCategoriesLoading } = useQuery({
		queryKey: ['categories'],
		queryFn: () => categoryService.getAll(),
		initialData: initialCategories
	})

	const { data: devices, isLoading: isDevicesLoading } = useQuery({
		queryKey: ['devices'],
		queryFn: () => deviceService.getAll({ take: 15 }),
		initialData: initialTypes
	})

	const onToggle = (tab: string) => {
		setIsTarget((prev) => ({ ...prev, [tab]: !prev[tab] }))
	}

	if (isCategoriesLoading || isDevicesLoading) {
		return (
			<div className={styles.wrap}>
				<div className={styles.container}>
					{[...new Array(2)].map((item, index) => (
						<Skeleton key={index} />
					))}
				</div>
			</div>
		)
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
						{categories?.items.map((item) => (
							<Link
								className={clsx(styles.item, {
									[styles.target]: pathname === `${ROUTE.CATALOG}/${item.id}`
								})}
								href={`${ROUTE.CATALOG}/${item.id}`}
								key={item.id}
							>
								{formatCase(item.name)}
							</Link>
						))}
					</div>
				</div>
				<div
					className={clsx(styles.dropdown, {
						[styles.collapsed]: !isTarget.devices
					})}
				>
					<button
						className={styles.super}
						onClick={() => onToggle('devices')}
					>
						<ChevronUp className={styles.icon} /> Устройства
					</button>
					<div className={styles.group}>
						{devices?.items.map((item) => (
							<Link
								className={clsx(styles.item, {
									[styles.target]:
										`${pathname}?${params}` ===
										`${ROUTE.SEARCH}?device=${item.id}`
								})}
								href={`${ROUTE.SEARCH}?device=${item.id}`}
								key={item.id}
							>
								{item.name}
							</Link>
						))}
						<Link
							className={styles.more}
							href={ROUTE.DEVICES}
						>
							Показать больше
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
