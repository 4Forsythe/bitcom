import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Heart } from 'lucide-react'

import { Skeleton } from './Skeleton'

import { ROUTE } from '@/config/routes.config'

import { ProductType } from '@/types/product.types'

import styles from './ProductCard.module.scss'
import { useCreateCart } from '@/hooks/useCreateCart'
import { useDeleteCart } from '@/hooks/useDeleteCart'
import { useCartStore } from '@/store/cart.store'
import { useCart } from '@/hooks/useCart'
import clsx from 'clsx'

export const ProductCard = ({
	id,
	name,
	barcodes,
	count,
	price,
	device
}: ProductType) => {
	const maxVisibleBarcodes = 3
	const articles = barcodes.split(';').join(', ')

	const { data: cart } = useCart()

	const isCartItem = cart?.items.some((item) => item.product.id === id)

	console.log(cart)

	const {
		mutate: mutateCreateCart,
		isPending: isCreateCartPending,
		isError: isCreateCartError
	} = useCreateCart()

	const { mutate: mutateDeleteCart, isPending: isDeleteCartPending } =
		useDeleteCart()

	const addCartItem = () => {
		mutateCreateCart({ productId: id, count: 1 })
	}

	const removeCartItem = () => {
		mutateDeleteCart(id)
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
					src={'/images/image-placeholder.png'}
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
				<span className={styles.article}>
					{barcodes.length > maxVisibleBarcodes ? `${articles} ...` : articles}
				</span>
				<Link
					className={styles.type}
					href={`${ROUTE.CATALOG}?type=${device}`}
				>
					{device?.name}
				</Link>
				<p className={styles.description}>Описание</p>
			</div>
			<div className={styles.details}>
				<p className={styles.price}>{price} ₽</p>
				<span className={styles.count}>В наличии {count} шт.</span>
				<div className={styles.controls}>
					<button className={styles.wishlist}>
						<Heart className={styles.icon} />
					</button>
					<button
						className={styles.buy}
						onClick={isCartItem ? addCartItem : removeCartItem}
					>
						{isCartItem ? 'Удалить' : 'Добавить'}
					</button>
				</div>
			</div>
		</article>
	)
}
