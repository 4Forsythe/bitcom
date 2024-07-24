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

export const WishListItem = ({ id, product }: WishListItemType) => {
	const { mutate: mutateToggleWishList, isPending: isToggleWishListPending } =
		useToggleWishList()

	const { mutate: mutateCreateCart, isPending: isCreateCartPending } =
		useCreateCart()

	const onToggle = () => {
		mutateToggleWishList(product.id)
	}

	const toCart = () => {
		mutateCreateCart({ productId: product.id, count: 1 })
	}

	const { cart } = useUserStore()

	const isInCart = cart?.items.some((item) => item.product.id === product.id)

	return (
		<article className={clsx(styles.container, 'animate-opacity')}>
			<Link
				className={styles.cover}
				href={`${ROUTE.PRODUCT}/${product.id}`}
				target='_blank'
			>
				<Image
					className={styles.source}
					width={200}
					height={200}
					src='/images/image-placeholder.png'
					alt={product.name}
				/>
			</Link>
			<Link
				href={`${ROUTE.PRODUCT}/${product.id}`}
				target='_blank'
			>
				<h5 className={styles.title}>{product.name}</h5>
			</Link>
			<div className={styles.details}>
				{isInCart ? (
					<Link
						className={styles.cart}
						href={ROUTE.CART}
					>
						В корзине
					</Link>
				) : (
					<Button
						variant='contained'
						disabled={isCreateCartPending || isToggleWishListPending}
						onClick={toCart}
					>
						В корзину
					</Button>
				)}
				<button
					className={styles.control}
					disabled={isCreateCartPending || isToggleWishListPending}
					onClick={onToggle}
				>
					<Heart className={styles.icon} />
				</button>
			</div>
		</article>
	)
}
