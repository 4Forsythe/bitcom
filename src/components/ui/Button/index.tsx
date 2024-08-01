import clsx from 'clsx'
import { LoaderCircle } from 'lucide-react'

import styles from './Button.module.scss'
import Link from 'next/link'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	href?: string
	variant?: 'contained' | 'outlined'
	error?: string
	success?: boolean
	isLoading?: boolean
}

export const Button = ({
	className,
	children,
	href,
	variant = 'contained',
	error,
	success,
	isLoading,
	...rest
}: React.PropsWithChildren<ButtonProps>) => {
	return (
		<>
			{href ? (
				<div className={styles.container}>
					<Link
						href={href}
						className={clsx(styles.element, className, {
							[styles.contained]: variant === 'contained',
							[styles.outlined]: variant === 'outlined',
							[styles.loaded]: isLoading
						})}
					>
						{children}
						{isLoading && <LoaderCircle className={styles.loader} />}
					</Link>
					{error && (
						<span className={clsx(styles.message, styles.error)}>{error}</span>
					)}
				</div>
			) : (
				<div className={styles.container}>
					<button
						className={clsx(styles.element, className, {
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
					{error && (
						<span className={clsx(styles.message, styles.error)}>{error}</span>
					)}
				</div>
			)}
		</>
	)
}
