'use client'

import Link from 'next/link'
import Image from 'next/image'

import { Heart } from 'lucide-react'

import { Button } from '@/components/ui/Button'

import { useCreateCart } from '@/hooks/useCreateCart'
import { useToggleWishList } from '@/hooks/useToggleWishList'
import type { WishListItemType } from '@/types/wish-list.types'

import { ROUTE } from '@/config/routes.config'

import styles from './WishListItem.module.scss'
import { useUserStore } from '@/store/user.store'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { AddWishListButton } from '@/components/ui/AddWishListButton'
import { AddCartButton } from '@/components/ui/AddCartButton'
import { useDeleteCart } from '@/hooks/useDeleteCart'
import { useWishList } from '@/hooks/useWishList'

export const WishListItem = ({ id, product }: WishListItemType) => {
	const { data: cart, isLoading: isCartLoading } = useCart()
	const { data: wishList, isLoading: isWishListLoading } = useWishList()

	const isLoading = isCartLoading || isWishListLoading

	const isInCart = cart?.items.find((item) => item.product.id === product.id)
	const isInWishList = wishList?.items.find(
		(item) => item.product.id === product.id
	)

	const { mutate: mutateToggleWishList, isPending: isToggleWishListPending } =
		useToggleWishList()

	const { mutate: mutateCreateCart, isPending: isCreateCartPending } =
		useCreateCart()

	const { mutate: mutateDeleteCart, isPending: isDeleteCartPending } =
		useDeleteCart()

	const onToggle = () => {
		mutateToggleWishList(product.id)
	}

	const toCart = () => {
		mutateCreateCart({ productId: product.id, count: 1 })
	}

	const removeFromCart = () => {
		if (isInCart) mutateDeleteCart(isInCart.id)
	}

	return (
		<article className={clsx(styles.container, 'animate-opacity')}>
			<Link
				className={styles.cover}
				href={`/product/${id}`}
			>
				<Image
					className={styles.image}
					width={1000}
					height={1000}
					src={'/static/image-placeholder.png'}
					alt={product.name}
					priority
				/>
			</Link>
			<div className={styles.information}>
				<Link
					className={styles.title}
					href={`/product/${id}`}
				>
					{product.name}
				</Link>
				<span className={styles.article}>{product.barcode}</span>
				<Link
					className={styles.type}
					href={`${ROUTE.SEARCH}?device=${product.device?.id}`}
				>
					{product.device?.name}
				</Link>
			</div>
			<div className={styles.details}>
				<p className={styles.price}>{product.price} ₽</p>
				<span className={styles.count}>В наличии {product.count} шт.</span>
				<div className={styles.controls}>
					<AddWishListButton
						variant={isInWishList ? 'contained' : 'outlined'}
						onClick={onToggle}
						isLoading={isToggleWishListPending}
					/>
					<AddCartButton
						variant={isInCart ? 'outlined' : 'contained'}
						onClick={isInCart ? removeFromCart : toCart}
						isLoading={isCreateCartPending || isDeleteCartPending}
					>
						{isInCart ? 'Убрать' : 'Добавить'}
					</AddCartButton>
				</div>
			</div>
		</article>
	)
}
