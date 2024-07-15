'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import clsx from 'clsx'

import { PROTECTED_MENU, PUBLIC_MENU } from './menu.data'

import { useUserStore } from '@/store/user.store'

import styles from './ProfileSidebar.module.scss'
import { ROUTE } from '@/config/routes.config'

export const ProfileSidebar = () => {
	const pathname = usePathname()

	const { user } = useUserStore()

	return (
		<nav className={styles.container}>
			<ul className={styles.menu}>
				{PUBLIC_MENU.map((item) => (
					<li
						key={item.href}
						className={styles.item}
					>
						<Link
							href={item.href}
							className={clsx(styles.tab, {
								[styles.target]: pathname === item.href
							})}
						>
							<item.icon className={styles.icon} />
							{item.label}
						</Link>
					</li>
				))}
			</ul>
			{user?.role && (
				<ul className={clsx(styles.menu, 'animate-opacity')}>
					{PROTECTED_MENU.map((item) => (
						<li
							key={item.href}
							className={styles.item}
						>
							<Link
								href={item.href}
								target={item.href === ROUTE.EDITOR ? '_blank' : '_self'}
								className={clsx(styles.tab, {
									[styles.target]: pathname === item.href
								})}
							>
								<item.icon className={styles.icon} />
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			)}
		</nav>
	)
}
