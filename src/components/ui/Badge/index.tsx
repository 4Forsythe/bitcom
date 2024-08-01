import clsx from 'clsx'
import styles from './Badge.module.scss'
import Link from 'next/link'

interface BadgeProps {
	className?: string
	href?: string
	children: string | React.ReactNode
	variant?: 'contained' | 'outlined'
	onClick?: () => void
}

export const Badge = ({
	className,
	href,
	children,
	variant = 'outlined',
	onClick
}: BadgeProps) => {
	return (
		<>
			{href ? (
				<Link
					className={clsx(styles.container, className, {
						[styles.contained]: variant === 'contained',
						[styles.outlined]: variant === 'outlined'
					})}
					href={href}
					target='_blank'
					onClick={onClick}
				>
					{children}
				</Link>
			) : (
				<span
					className={clsx(styles.container, className, {
						[styles.contained]: variant === 'contained',
						[styles.outlined]: variant === 'outlined'
					})}
					onClick={onClick}
				>
					{children}
				</span>
			)}
		</>
	)
}
