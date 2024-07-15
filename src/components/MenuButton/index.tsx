import Link from 'next/link'

import clsx from 'clsx'
import { type LucideIcon } from 'lucide-react'

import styles from './MenuButton.module.scss'

export interface MenuButtonProps {
	tab: {
		title: string
		icon: LucideIcon
		href?: string
	}
	onClick?: () => void
}

export const MenuButton = ({ tab, onClick }: MenuButtonProps) => {
	return (
		<>
			{tab.href ? (
				<Link
					className={clsx(styles.container, 'animate-opacity')}
					href={tab.href}
				>
					<tab.icon className={styles.icon} />
					<span className={styles.text}>{tab.title}</span>
				</Link>
			) : (
				<button
					className={clsx(styles.container, 'animate-opacity')}
					onClick={onClick}
				>
					<tab.icon className={styles.icon} />
					<span className={styles.text}>{tab.title}</span>
				</button>
			)}
		</>
	)
}
