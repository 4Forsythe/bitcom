'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import clsx from 'clsx'

import { PROTECTED_MENU, PUBLIC_MENU } from './menu.data'

import { useUserStore } from '@/store/user.store'

import styles from './ProfileSidebar.module.scss'
import { ROUTE } from '@/config/routes.config'
import { LogOut } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'
import { useRouter } from 'next/navigation'

export const ProfileSidebar = () => {
	const router = useRouter()
	const pathname = usePathname()

	const queryClient = useQueryClient()

	const { user, setUser } = useUserStore()

	const { mutate, isPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			queryClient.removeQueries({ queryKey: ['profile'] })
			setUser(null)
		}
	})

	const logout = () => {
		mutate()
		router.push(ROUTE.HOME)
	}

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
				<ul className={clsx(styles.menu)}>
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
			<div className={styles.item}>
				<button
					className={styles.tab}
					disabled={isPending}
					onClick={logout}
				>
					<LogOut className={styles.icon} />
					Выйти
				</button>
			</div>
		</nav>
	)
}
