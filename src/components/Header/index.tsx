'use client'

import Link from 'next/link'
import Image from 'next/image'

import clsx from 'clsx'
import { CircleUser, MapPin, Search } from 'lucide-react'

import { SearchBar } from '@/components/SearchBar'

import { useModal } from '@/hooks/useModal'
import { useProfile } from '@/hooks/useProfile'

import { Modal } from '@/components/ui/Modal'
import { AuthForm } from '@/components/AuthForm'

import styles from './Header.module.scss'
import { ROUTE } from '@/config/routes.config'
import { MenuButton } from '@/components/MenuButton'
import { MENU } from './menu.data'
import { Skeleton } from '@/components/MenuButton/Skeleton'

export const Header = () => {
	const { isOpen, onOpen } = useModal()
	const { data: profile, isLoading } = useProfile()

	const authDialog = () => {
		if (!!!profile) onOpen()
	}

	return (
		<>
			{isOpen && <Modal content={<AuthForm />} />}
			<div className={styles.roof}>
				<div className={styles.information}>
					<Link
						className={styles.link}
						href='https://yandex.ru/maps/-/CDfZBXKB'
						target='blank'
					>
						<MapPin className={styles.icon} />
						бул. Кулибина, 6А, офис №7, г. Тольятти
					</Link>
					<Link
						className={styles.link}
						href='tel:88482411212'
					>
						8-8482-41-1212
					</Link>
				</div>
			</div>
			<header className={styles.container}>
				<div className={styles.inner}>
					<div className={styles.menu}>
						<Link
							className={styles.logotype}
							href='/'
						>
							<Image
								className={styles.image}
								width={240}
								height={50}
								src='/images/LOGO.png'
								alt='Logo'
								priority
							/>
						</Link>
						<div className={styles.bar}>
							<SearchBar />
						</div>
						<div className={styles.controls}>
							{isLoading ? (
								<>
									{[...new Array(3)].map((item, index) => (
										<Skeleton key={index} />
									))}
								</>
							) : (
								<>
									<div className={styles.search}>
										<MenuButton
											tab={{
												title: 'Поиск',
												icon: Search,
												href: ROUTE.SEARCH
											}}
										/>
									</div>
									{MENU.map((item) => (
										<MenuButton
											key={item.href}
											tab={item}
											onClick={authDialog}
										/>
									))}
									<MenuButton
										tab={{
											title: profile ? 'Кабинет' : 'Войти',
											icon: CircleUser,
											href: profile && ROUTE.PROFILE
										}}
										onClick={authDialog}
									/>
								</>
							)}
						</div>
					</div>
				</div>
			</header>
		</>
	)
}
