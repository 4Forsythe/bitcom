'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import clsx from 'clsx'
import { Search, X } from 'lucide-react'

import { ROUTE } from '@/config/routes.config'

import styles from './SearchBar.module.scss'

export const SearchBar = () => {
	const router = useRouter()
	const [value, setValue] = React.useState('')

	const [isHovered, setIsHovered] = React.useState(false)
	const [isFocused, setIsFocused] = React.useState(false)

	const searchRef = React.useRef<HTMLDivElement>(null)
	const inputRef = React.useRef<HTMLInputElement>(null)

	const onEnterDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (!value.trim()) return

		event.key === 'Enter' ? onSearch() : event.key === 'Escape' && onClear()
	}

	const onSearch = () => {
		router.push(`${ROUTE.SEARCH}?q=${value}`)
		inputRef.current?.blur()
	}

	const onClear = () => {
		setValue('')
	}

	const onMouseEnter = () => {
		searchRef.current && setIsHovered(true)
	}

	const onMouseLeave = () => {
		searchRef.current && setIsHovered(false)
	}

	return (
		<>
			{isFocused && <div className={styles.overlay} />}
			<div
				ref={searchRef}
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
					onBlur={() => setIsFocused(false)}
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
			</div>
		</>
	)
}
