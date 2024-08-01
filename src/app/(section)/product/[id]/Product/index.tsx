'use client'

import Image from 'next/image'

import clsx from 'clsx'
import { Heart } from 'lucide-react'

import type { ProductType } from '@/types/product.types'

import { useCart } from '@/hooks/useCart'
import { useWishList } from '@/hooks/useWishList'
import { useCreateCart } from '@/hooks/useCreateCart'
import { useDeleteCart } from '@/hooks/useDeleteCart'
import { useToggleWishList } from '@/hooks/useToggleWishList'

import styles from './Product.module.scss'
import { useModal } from '@/hooks/useModal'
import { AuthForm } from '@/components/AuthForm'
import { useUserStore } from '@/store/user.store'
import Link from 'next/link'

export const Product = ({ product }: { product: ProductType }) => {
	const { onOpen } = useModal()
	const { user } = useUserStore()
	const { data: cart, isLoading: isCartLoading } = useCart()
	const { data: wishList, isLoading: isWishListLoading } = useWishList()

	const isLoading = isCartLoading || isWishListLoading

	const isInCart = cart?.items.find((item) => item.product.id === product.id)
	const isInWishList = wishList?.items.find(
		(item) => item.product.id === product.id
	)

	const authDialog = () => {
		if (!!!user) onOpen(<AuthForm />)
	}

	const { mutate: mutateCreateCart, isPending: isCreateCartPending } =
		useCreateCart()

	const { mutate: mutateDeleteCart, isPending: isDeleteCartPending } =
		useDeleteCart()

	const { mutate: mutateToggleWishList, isPending: isToggleWishListPending } =
		useToggleWishList()

	const toCart = () => {
		authDialog()
		mutateCreateCart({ productId: product.id, count: 1 })
	}

	const removeFromCart = () => {
		authDialog()
		if (isInCart) mutateDeleteCart(isInCart.id)
	}

	const toWishList = () => {
		authDialog()
		mutateToggleWishList(product.id)
	}

	return (
		<>
			<div className={styles.container}>
				<div className={styles.cover}>
					<Image
						className={styles.image}
						width={1000}
						height={1000}
						src={'/static/image-placeholder.png'}
						alt={product.name}
						priority
					/>
				</div>
				<div className={styles.information}>
					<div className={styles.overview}>
						<h1 className={styles.title}>{product.name}</h1>
						<p className={styles.description}>
							Если у вас возник тот или иной вопрос по товару,
							<br />
							звоните нам: 8 927 783-90-22 или 8 (8482) 41 1212.
						</p>
					</div>
					<div className={styles.options}>
						<div className={styles.availables}>
							<div className={styles.article}>
								<span className={styles.text}>Артикул:</span>
								<span className={styles.breadcrumb}>{product.barcode}</span>
							</div>
							<span className={styles.breadcrumb}>
								В наличии {product.count} шт.
							</span>
						</div>
						<div className={styles.features}>
							{isLoading ? (
								<div className={styles.controls}>
									<div className='w-[200px] h-[52px] bg-gray-300 rounded-md animate-pulse' />
									<div className='w-[52px] h-[52px] bg-gray-300 rounded-md animate-pulse' />
								</div>
							) : (
								<div className={styles.controls}>
									<button
										className={styles.buy}
										disabled={isCreateCartPending || isDeleteCartPending}
										onClick={isInCart ? removeFromCart : toCart}
									>
										{isInCart ? 'Убрать из корзины' : 'Добавить в корзину'}
									</button>
									<button
										className={clsx(styles.wishlist, {
											[styles.active]: isInWishList
										})}
										disabled={isToggleWishListPending}
										onClick={toWishList}
									>
										<Heart className={styles.icon} />
									</button>
								</div>
							)}
							<span className={styles.price}>{product.price} ₽</span>
						</div>
					</div>
					<div className={styles.marketplaces}>
						<Link
							className={styles.item}
							href='https://www.avito.ru/brands/bitcom63'
							target='_blank'
						>
							<Image
								className={styles.image}
								width={100}
								height={100}
								src='/icons/Avito.svg'
								alt='Avito'
								priority
							/>
						</Link>
						<Link
							className={styles.item}
							href='https://market.yandex.ru/business--resurstekhno-elektronika/1148896'
							target='_blank'
						>
							<Image
								className={styles.image}
								width={100}
								height={100}
								src='/icons/Market.svg'
								alt='Yandex.Market'
								priority
							/>
						</Link>
					</div>
					<div className={styles.details}>
						<span className={styles.title}>Характеристики товара</span>
						<ul className={styles.characteristics}>
							<li className={styles.characteristic}>
								Тип устройства
								<span>{product.device?.name}</span>
							</li>
							<li className={styles.characteristic}>
								Бренд
								<span>{product.brand?.name}</span>
							</li>
							<li className={styles.characteristic}>
								Модель
								<span>{product.model?.name}</span>
							</li>
							<li className={styles.characteristic}>
								Гарантия
								<span>3 мес.</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}
