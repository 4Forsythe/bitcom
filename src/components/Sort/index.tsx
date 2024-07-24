'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import clsx from 'clsx'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'

import { useModal } from '@/hooks/useModal'
import { getSearchParams } from '@/utils/get-search-params'

import { PRODUCT_SORTS, POST_SORTS } from './sorts.data'
import type { SortType } from './sorts.data'

import styles from './Sort.module.scss'
import { Modal } from '../ui/Modal'
import { Filters } from '../Filters'
import { useWindowSize } from '@/hooks/useWindowSize'
import { PopupLayout } from '@/layouts/PopupLayout'

interface SortProps {
	isProducts?: boolean
	isPosts?: boolean
}

export const Sort = ({ isProducts, isPosts }: SortProps) => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const { width } = useWindowSize()
	const { isOpen, onOpen } = useModal()

	const isTablet = width && width <= 1024

	const { sortBy, orderBy } = getSearchParams()

	const initializeSorts = (sorts: SortType[]) => {
		return (
			sorts.find(
				(sort) => sort.property === sortBy && sort.order === orderBy
			) || sorts[0]
		)
	}

	const [isDrop, setIsDrop] = React.useState(false)
	const dropdownRef = React.useRef<HTMLDivElement>(null)

	const [sorts, setSorts] = React.useState<SortType[]>(
		isProducts ? PRODUCT_SORTS : POST_SORTS
	)
	const [sort, setSort] = React.useState<SortType>(
		isProducts ? initializeSorts(PRODUCT_SORTS) : initializeSorts(POST_SORTS)
	)

	React.useEffect(() => {
		const subscribe = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDrop(false)
			}
		}

		document.body.addEventListener('click', subscribe)

		return () => {
			document.body.removeEventListener('click', subscribe)
		}
	}, [])

	const onSortChange = (sort: SortType) => {
		setSort(sort)
		const params = new URLSearchParams(searchParams.toString())
		params.set('sortBy', sort.property)
		params.set('orderBy', sort.order)
		router.push(`?${params.toString()}`)
		setIsDrop(false)
	}

	return (
		<div
			className={styles.container}
			ref={dropdownRef}
		>
			<ul className={styles.list}>
				<li className={styles.item}>
					<span className={styles.label}>Сортировка:</span>
					<button
						className={styles.drop}
						onClick={() => setIsDrop(!isDrop)}
					>
						{sort.name}
						<ChevronDown
							className={clsx(styles.icon, { [styles.droped]: isDrop })}
						/>
					</button>
				</li>
				{isDrop && (
					<div className={styles.dropdown}>
						<ul className={styles.menu}>
							{sorts.map((item, index) => (
								<li
									className={styles.item}
									key={index}
								>
									<button
										className={clsx(styles.radio, {
											[styles.target]: item === sort
										})}
										onClick={() => onSortChange(item)}
									>
										{item.name}
									</button>
								</li>
							))}
						</ul>
					</div>
				)}
			</ul>
			<button
				className={styles.filters}
				onClick={() =>
					onOpen(
						<PopupLayout>
							<Filters />
						</PopupLayout>
					)
				}
			>
				<SlidersHorizontal className={styles.icon} />
				Фильтры
			</button>
		</div>
	)
}
