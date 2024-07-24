'use client'

import React from 'react'

import Link from 'next/link'
import Image from 'next/image'

import clsx from 'clsx'
import { Minus, Plus, Heart, Trash } from 'lucide-react'

import { useWishList } from '@/hooks/useWishList'
import { useUpdateCart } from '@/hooks/useUpdateCart'
import { useDeleteCart } from '@/hooks/useDeleteCart'
import { useToggleWishList } from '@/hooks/useToggleWishList'

import type { CartItemType } from '@/types/cart.types'

import { ROUTE } from '@/config/routes.config'

import styles from './CartItem.module.scss'

export const CartItem = ({ id, product, count }: CartItemType) => {
	const { mutate: mutateUpdateCart, isPending: isUpdateCartPending } =
		useUpdateCart()

	const { mutate: mutateDeleteCart, isPending: isDeleteCartPending } =
		useDeleteCart()

	const { mutate: mutateToggleWishList, isPending: isToggleWishListPending } =
		useToggleWishList()

	const isLoading =
		isUpdateCartPending || isDeleteCartPending || isToggleWishListPending

	const toWishList = () => {
		mutateToggleWishList(product.id)
	}

	const { data: wishList } = useWishList()

	const isInWishList = wishList?.items.some(
		(item) => item.product.id === product.id
	)

	const increment = () => {
		if (product.count > count) {
			mutateUpdateCart({
				id,
				data: { productId: product.id, count: count + 1 }
			})
		}
	}

	const decrement = () => {
		if (count > 1) {
			mutateUpdateCart({
				id,
				data: { productId: product.id, count: count - 1 }
			})
		}
	}

	const remove = () => {
		mutateDeleteCart(id)
	}

	return (
		<div
			className={clsx(styles.container, 'animate-opacity', {
				[styles.negative]: !product.count
			})}
		>
			<div className={styles.cover}>
				<Link
					className={styles.link}
					href={`${ROUTE.PRODUCT}/${product.id}`}
					target='_blank'
				>
					<Image
						className={styles.image}
						width={100}
						height={100}
						src={'/images/image-placeholder.png'}
						alt='1'
						priority
					/>
				</Link>
				<span className={styles.barcode}>{product.barcode}</span>
			</div>
			<div className={styles.information}>
				<Link
					className={styles.title}
					href={`${ROUTE.PRODUCT}/${product.id}`}
					target='_blank'
				>
					{product.name}
				</Link>
				<div className={styles.counter}>
					<button
						className={styles.control}
						onClick={decrement}
						disabled={isLoading}
					>
						<Minus size={18} />
					</button>
					<span className={styles.count}>{count}</span>
					<button
						className={styles.control}
						onClick={increment}
						disabled={isLoading}
					>
						<Plus size={18} />
					</button>
				</div>
				<span className={styles.avails}>
					{product.count ? `В наличии: ${product.count} шт.` : 'Нет в наличии'}
				</span>
			</div>
			<div className={styles.meta}>
				<div className={styles.menu}>
					<button
						className={clsx(styles.action, { [styles.active]: isInWishList })}
						onClick={toWishList}
						disabled={isLoading}
					>
						<Heart size={18} />
					</button>
					<button
						className={styles.action}
						onClick={remove}
						disabled={isLoading}
					>
						<Trash size={18} />
					</button>
				</div>
				<span className={styles.price}>{product.price} ₽</span>
			</div>
		</div>
	)
}
