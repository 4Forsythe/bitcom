import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import clsx from 'clsx'
import { Heart } from 'lucide-react'

import { Skeleton } from './Skeleton'

import { ROUTE } from '@/config/routes.config'

import { useCart } from '@/hooks/useCart'
import { useCreateCart } from '@/hooks/useCreateCart'
import { useDeleteCart } from '@/hooks/useDeleteCart'
import type { ProductType } from '@/types/product.types'

import styles from './ProductCard.module.scss'
import { useModal } from '@/hooks/useModal'
import { useUserStore } from '@/store/user.store'
import { AuthForm } from '@/components/AuthForm'
import { useWishList } from '@/hooks/useWishList'
import { useToggleWishList } from '@/hooks/useToggleWishList'
import { AddCartButton } from '@/components/ui/AddCartButton'
import { AddWishListButton } from '@/components/ui/AddWishListButton'

export const ProductCard = ({
	id,
	name,
	barcode,
	count,
	price,
	device
}: ProductType) => {
	const { onOpen } = useModal()
	const { user } = useUserStore()
	const { data: cart, isLoading: isCartLoading } = useCart()
	const { data: wishList, isLoading: isWishListLoading } = useWishList()

	const isLoading = isCartLoading || isWishListLoading

	const isInCart = cart?.items.find((item) => item.product.id === id)
	const isInWishList = wishList?.items.find((item) => item.product.id === id)

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
		mutateCreateCart({ productId: id, count: 1 })
	}

	const removeFromCart = () => {
		if (isInCart) mutateDeleteCart(isInCart.id)
	}

	const toWishList = () => {
		authDialog()
		mutateToggleWishList(id)
	}

	if (!id) {
		return <Skeleton />
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
					alt={name}
					priority
				/>
			</Link>
			<div className={styles.information}>
				<Link
					className={styles.title}
					href={`/product/${id}`}
				>
					{name}
				</Link>
				<span className={styles.article}>{barcode}</span>
				<Link
					className={styles.type}
					href={`${ROUTE.SEARCH}?device=${device?.id}`}
				>
					{device?.name}
				</Link>
			</div>
			<div className={styles.details}>
				<p className={styles.price}>{price} ₽</p>
				<span className={styles.count}>В наличии {count} шт.</span>
				{!isLoading && (
					<div className={styles.controls}>
						<AddWishListButton
							variant={isInWishList ? 'contained' : 'outlined'}
							onClick={toWishList}
							isLoading={isToggleWishListPending}
						/>
						<AddCartButton
							variant={isInCart ? 'outlined' : 'contained'}
							onClick={isInCart ? removeFromCart : toCart}
							isLoading={isCreateCartPending || isDeleteCartPending}
						>
							{isInCart ? 'Удалить' : 'Добавить'}
						</AddCartButton>
					</div>
				)}
			</div>
		</article>
	)
}
