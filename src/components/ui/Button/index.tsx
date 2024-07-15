import clsx from 'clsx'
import { LoaderCircle } from 'lucide-react'

import styles from './Button.module.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'contained' | 'outlined'
	error?: string
	success?: boolean
	isLoading?: boolean
}

export const Button = ({
	className,
	children,
	variant = 'contained',
	error,
	success,
	isLoading,
	...rest
}: React.PropsWithChildren<ButtonProps>) => {
	return (
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
			{success && <span className={styles.message}>Информация обновлена</span>}
			{error && (
				<span className={clsx(styles.message, styles.error)}>{error}</span>
			)}
		</div>
	)
}
