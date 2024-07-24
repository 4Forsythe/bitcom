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

export const ProductCard = ({
	id,
	name,
	barcode,
	count,
	price,
	device
}: ProductType) => {
	const { data: cart, isLoading } = useCart()

	const item = cart?.items.find((item) => item.product.id === id)

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
		if (item) mutateDeleteCart(item.id)
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
				<span className={styles.article}>{barcode}</span>
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
				{!isLoading && (
					<div className={styles.controls}>
						<button className={styles.wishlist}>
							<Heart className={styles.icon} />
						</button>
						<button
							className={styles.buy}
							onClick={item ? removeCartItem : addCartItem}
						>
							{item ? 'Удалить' : 'Добавить'}
						</button>
					</div>
				)}
			</div>
		</article>
	)
}
