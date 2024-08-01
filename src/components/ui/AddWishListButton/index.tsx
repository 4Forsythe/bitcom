'use client'

import clsx from 'clsx'
import { Heart, LoaderCircle } from 'lucide-react'

import styles from './AddWishListButton.module.scss'

interface AddWishListButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'contained' | 'outlined'
	isLoading?: boolean
}

export const AddWishListButton = ({
	className,
	children,
	variant = 'contained',
	isLoading,
	...rest
}: AddWishListButtonProps) => {
	return (
		<button
			className={clsx(styles.container, className, {
				[styles.contained]: variant === 'contained',
				[styles.outlined]: variant === 'outlined',
				[styles.loaded]: isLoading
			})}
			disabled={isLoading}
			{...rest}
		>
			<Heart className={styles.icon} />
			{isLoading && <LoaderCircle className={styles.loader} />}
		</button>
	)
}
