'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import clsx from 'clsx'
import { useQuery } from '@tanstack/react-query'
import { Search, X, ArrowUpRight } from 'lucide-react'

import { useDebounce } from '@/hooks/useDebounce'

import { ROUTE } from '@/config/routes.config'
import { productService } from '@/services/product.service'

import styles from './SearchBar.module.scss'

export const SearchBar = () => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const [value, setValue] = React.useState('')

	const [isHovered, setIsHovered] = React.useState(false)
	const [isFocused, setIsFocused] = React.useState(false)

	const containerRef = React.useRef<HTMLDivElement>(null)
	const inputRef = React.useRef<HTMLInputElement>(null)
	const presearchRef = React.useRef<HTMLDivElement>(null)

	const { query } = useDebounce({ value, delay: 700 })

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['search', query],
		queryFn: () => productService.getAll({ name: value, take: 10 }),
		enabled: !!query
	})

	const onEnterDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (!value.trim()) return

		event.key === 'Enter' ? onSearch() : event.key === 'Escape' && onClear()
	}

	const onSearch = () => {
		if (value.trim()) {
			const params = new URLSearchParams(searchParams.toString())
			params.set('q', value)
			router.push(`${ROUTE.SEARCH}?${params.toString()}`)
			inputRef.current?.blur()
		}

		setIsFocused(false)
	}

	const onClear = () => {
		setValue('')
		inputRef.current?.focus()
	}

	const onMouseEnter = () => {
		containerRef.current && setIsHovered(true)
	}

	const onMouseLeave = () => {
		containerRef.current && setIsHovered(false)
	}

	const handleClickOutside = React.useCallback((event: MouseEvent) => {
		if (
			containerRef.current &&
			!containerRef.current.contains(event.target as Node)
		) {
			setIsFocused(false)
		}
	}, [])

	React.useEffect(() => {
		document.body.addEventListener('click', handleClickOutside)

		return () => {
			document.body.removeEventListener('click', handleClickOutside)
		}
	}, [handleClickOutside])

	return (
		<>
			{isFocused && <div className={styles.overlay} />}
			<div
				ref={containerRef}
				className={clsx(styles.container, {
					[styles.focused]: isFocused || isHovered
				})}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				<input
					ref={inputRef}
					className={styles.form}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onKeyDown={onEnterDown}
					onFocus={() => setIsFocused(true)}
					type='text'
					placeholder='Поиск на сайте'
				/>
				<div className={styles.controls}>
					{value && (
						<>
							<button
								className={styles.control}
								onClick={onClear}
							>
								<X className={styles.icon} />
							</button>
							<span className={styles.divider} />
						</>
					)}
					<button
						className={styles.control}
						onClick={onSearch}
					>
						<Search className={styles.icon} />
					</button>
				</div>
				{isFocused && value && !!data?.items.length && (
					<div
						className={styles.presearch}
						ref={presearchRef}
					>
						<ul className={styles.items}>
							{data.items.map((item) => (
								<li key={item.id}>
									<button
										className={styles.item}
										onClick={() => {
											router.push(`${ROUTE.PRODUCT}/${item.id}`)
											setIsFocused(false)
										}}
									>
										<Search className={styles.icon} />
										<p className={styles.title}>{item.name}</p>
										<ArrowUpRight className={styles.icon} />
									</button>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</>
	)
}
