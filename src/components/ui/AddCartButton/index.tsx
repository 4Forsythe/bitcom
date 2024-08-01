'use client'

import Link from 'next/link'

import clsx from 'clsx'
import { LoaderCircle } from 'lucide-react'

import styles from './AddCartButton.module.scss'

interface AddCartButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	href?: string
	variant?: 'contained' | 'outlined'
	isLoading?: boolean
}

export const AddCartButton = ({
	className,
	href,
	children,
	variant = 'contained',
	isLoading,
	...rest
}: React.PropsWithChildren<AddCartButtonProps>) => {
	return (
		<>
			{href ? (
				<Link
					href={href}
					className={clsx(styles.container, className, {
						[styles.contained]: variant === 'contained',
						[styles.outlined]: variant === 'outlined'
					})}
				>
					{children}
					{isLoading && <LoaderCircle className={styles.loader} />}
				</Link>
			) : (
				<button
					className={clsx(styles.container, className, {
						[styles.contained]: variant === 'contained',
						[styles.outlined]: variant === 'outlined',
						[styles.loaded]: isLoading
					})}
					disabled={isLoading}
					{...rest}
				>
					{children}
					{isLoading && <LoaderCircle className={styles.loader} />}
				</button>
			)}
		</>
	)
}
