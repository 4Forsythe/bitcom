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

export const Product = ({ product }: { product: ProductType }) => {
	const { data: cart, isLoading: isCartLoading } = useCart()
	const { data: wishList, isLoading: isWishListLoading } = useWishList()

	const isLoading = isCartLoading || isWishListLoading

	const isInCart = cart?.items.find((item) => item.product.id === product.id)
	const isInWishList = wishList?.items.find(
		(item) => item.product.id === product.id
	)

	const { mutate: mutateCreateCart, isPending: isCreateCartPending } =
		useCreateCart()

	const { mutate: mutateDeleteCart, isPending: isDeleteCartPending } =
		useDeleteCart()

	const { mutate: mutateToggleWishList, isPending: isToggleWishListPending } =
		useToggleWishList()

	const toCart = () => {
		mutateCreateCart({ productId: product.id, count: 1 })
	}

	const removeFromCart = () => {
		if (isInCart) mutateDeleteCart(isInCart.id)
	}

	const toWishList = () => {
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
						src={'/images/image-placeholder.png'}
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
							обращайтесь к нам на линию по номеру: 8-8482-41-1212.
						</p>
					</div>
					<div className={styles.options}>
						<div className={styles.availables}>
							<span className={styles.breadcrumb}>
								В наличии {product.count} шт.
							</span>
							<span className={styles.breadcrumb}>{product.barcode}</span>
						</div>
						<div className={styles.features}>
							{!isLoading && (
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
