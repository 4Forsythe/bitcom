'use client'

import React from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { CircleUser, Heart, MapPin, Search, ShoppingCart } from 'lucide-react'

import { Modal } from '@/components/ui/Modal'
import { AuthForm } from '@/components/AuthForm'
import { SearchBar } from '@/components/SearchBar'
import { MenuButton } from '@/components/ui/MenuButton'
import { Skeleton } from '@/components/ui/MenuButton/Skeleton'

import { useModal } from '@/hooks/useModal'
import { useProfile } from '@/hooks/useProfile'
import { useUserStore } from '@/store/user.store'

import { ROUTE } from '@/config/routes.config'

import styles from './Header.module.scss'
import { ADDRESS, PHONE } from '@/constants/contacts.constants'

export const Header = () => {
	const { onOpen } = useModal()

	const { data: profile, isLoading: isProfileLoading } = useProfile()

	const { cartCount, wishListCount, getCartCount, getWishListCount } =
		useUserStore()

	console.log('header', cartCount, wishListCount)

	React.useEffect(() => {
		getCartCount()
		getWishListCount()
	}, [])

	const isLoading = isProfileLoading

	const authDialog = () => {
		if (!!!profile) onOpen(<AuthForm />)
	}

	return (
		<>
			<div className={styles.roof}>
				<div className={styles.information}>
					<Link
						className={styles.link}
						href='https://yandex.ru/maps/-/CDfZBXKB'
						target='blank'
					>
						<MapPin className={styles.icon} />
						{ADDRESS}
					</Link>
					<Link
						className={styles.link}
						href='tel:88482411212'
					>
						{PHONE}
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
									<MenuButton
										tab={{
											title: 'Корзина',
											icon: ShoppingCart,
											href: profile && ROUTE.CART,
											badge: cartCount ? +cartCount : undefined
										}}
										onClick={authDialog}
									/>
									<MenuButton
										tab={{
											title: 'Желаемое',
											icon: Heart,
											href: profile && ROUTE.WISHLIST,
											badge: wishListCount ? +wishListCount : undefined
										}}
										onClick={authDialog}
									/>
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
