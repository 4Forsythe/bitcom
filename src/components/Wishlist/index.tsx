'use client'

import React from 'react'

import { WishlistItem, WishlistItemSkeleton, EmptyBlock } from '@/components'

import { useWishlist } from '@/hooks/useWishlist'
import { useWishlistStore } from '@/store/wishlist'

import styles from './wishlist.module.scss'

export const Wishlist: React.FC = () => {
	const { items } = useWishlistStore()
	const { isWishlistLoading } = useWishlist()

	return (
		<div className={styles.container}>
			<div className={styles.list}>
				{isWishlistLoading
					? [...new Array(3)].map((_, index) => (
							<WishlistItemSkeleton key={index} />
						))
					: items.map((item) => (
							<WishlistItem
								key={item.id}
								{...item}
							/>
						))}
			</div>
			{!isWishlistLoading && !(items.length > 0) && (
				<EmptyBlock
					title='Похоже, ваш список желаемого пуст'
					description='Добавляйте сюда понравившиеся товары, а мы сделаем все возможное, чтобы вы смогли их потом найти!'
				/>
			)}
		</div>
	)
}

export { WishlistItem, WishlistItemSkeleton } from './WishlistItem'
