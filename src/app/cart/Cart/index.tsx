'use client'

import React from 'react'

import { CartItem } from '@/app/cart/Cart/CartItem'

import { useCart } from '@/hooks/useCart'

import { calcNounDeclension } from '@/utils/calc-noun-declension'

import styles from './Cart.module.scss'
import { Skeleton } from './CartItem/Skeleton'
import { Button } from '@/components/ui/Button'
import { EmptyBlock } from '@/components/EmptyBlock'
import clsx from 'clsx'

export const Cart = () => {
	const { data, isLoading, isError } = useCart()

	return (
		<div className={styles.container}>
			<div className={styles.list}>
				<div className={styles.items}>
					{isLoading
						? [...new Array(2)].map((item, index) => <Skeleton key={index} />)
						: data?.items.map((item) => (
								<CartItem
									key={item.id}
									{...item}
								/>
							))}
				</div>
				{data?.items && data.items.length === 0 && (
					<EmptyBlock
						title='Похоже, в вашей корзине ничего нет'
						description='Вы можете найти нужный товар в каталоге или через поиск'
					/>
				)}
			</div>
			<div className={styles.side}>
				{!isLoading && (
					<div className={clsx(styles.block, 'animate-opacity')}>
						<div className={styles.summary}>
							<div className={styles.amount}>
								<span className={styles.total}>Итого</span>
								<span className={styles.text}>
									{calcNounDeclension(
										data?.count || 0,
										'товар',
										'товара',
										'товаров'
									)}
								</span>
							</div>
							<span className={styles.text}>{data?.total} ₽</span>
						</div>
						<Button
							className={styles.action}
							disabled={!data?.items.length}
						>
							Начать оформление
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}
