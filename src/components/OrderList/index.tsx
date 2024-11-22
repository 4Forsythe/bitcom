'use client'

import React from 'react'

import {
	OrderListItem,
	Pagination,
	WishlistItemSkeleton,
	EmptyBlock
} from '@/components'

import { useOrders } from '@/hooks/useOrders'

import styles from './order-list.module.scss'
import { OrderListItemSkeleton } from '../OrderListItem'
import { useOrdersStore } from '@/store/orders'

export const OrderList: React.FC = () => {
	const { items, count } = useOrdersStore()
	const { isOrdersLoading } = useOrders()

	return (
		<div className={styles.container}>
			<div className={styles.list}>
				{isOrdersLoading
					? [...new Array(3)].map((_, index) => (
							<OrderListItemSkeleton key={index} />
						))
					: items.map((item) => (
							<OrderListItem
								key={item.id}
								{...item}
							/>
						))}
			</div>
			{!isOrdersLoading && !(items.length > 0) && (
				<EmptyBlock
					title='У вас пока нет ни одного заказа'
					description='Оформляйте заказы и покупки через сайт, чтобы они могли появляться здесь!'
				/>
			)}
			{items.length > 0 && <Pagination total={count} />}
		</div>
	)
}
