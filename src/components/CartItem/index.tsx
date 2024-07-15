'use client'

import Link from 'next/link'
import Image from 'next/image'

import { Minus, Plus, Heart, Trash } from 'lucide-react'

import styles from './CartItem.module.scss'
import { useUpdateCart } from '@/hooks/useUpdateCart'
import { CartItemType } from '@/types/cart.types'
import { useDeleteCart } from '@/hooks/useDeleteCart'

export const CartItem = ({ id, product, count }: CartItemType) => {
	const {
		mutate: mutateUpdateCart,
		isPending: isUpdateCartPending,
		isError: isUpdateCartError
	} = useUpdateCart()

	const {
		mutate: mutateDeleteCart,
		isPending: isDeleteCartPending,
		isSuccess: isDeleteCartSuccess
	} = useDeleteCart()

	const increment = () => {
		if (product.count > count) {
			mutateUpdateCart({
				id,
				data: { productId: product.id, count: count + 1 }
			})
		}
	}

	const decrement = () => {
		mutateUpdateCart({ id, data: { productId: product.id, count: count - 1 } })
	}

	const remove = () => {
		mutateDeleteCart(id)
	}

	return (
		<div className={styles.container}>
			<div className={styles.cover}>
				<Link
					className={styles.link}
					href='/'
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
				<span className={styles.barcode}>000000</span>
			</div>
			<div className={styles.info}>
				<Link
					className={styles.title}
					href='/'
				>
					{product.name}
				</Link>
				<div className={styles.counter}>
					<button
						className={styles.control}
						onClick={decrement}
					>
						<Minus size={18} />
					</button>
					<span className={styles.count}>{count}</span>
					<button
						className={styles.control}
						onClick={increment}
					>
						<Plus size={18} />
					</button>
				</div>
				<span className={styles.avails}>В наличии: {product.count} шт.</span>
			</div>
			<div className={styles.meta}>
				<div className={styles.menu}>
					<button className={styles.action}>
						<Heart size={18} />
					</button>
					<button
						className={styles.action}
						onClick={remove}
					>
						<Trash size={18} />
					</button>
				</div>
				<span className={styles.price}>{product.price} ₽</span>
			</div>
		</div>
	)
}
