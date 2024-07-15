'use client'

import { CartItem } from '@/components/CartItem'

import { CartType } from '@/types/cart.types'

import styles from './Cart.module.scss'
import { useCart } from '@/hooks/useCart'
import React from 'react'
import { calcNounDeclension } from '@/utils/calc-noun-declension'

export const Cart = () => {
	const { data, isLoading, isError, isSuccess } = useCart()

	React.useEffect(() => {
		console.log(data)
	}, [isSuccess])

	return (
		<div className={styles.container}>
			<div className={styles.list}>
				<div className={styles.items}>
					{isLoading
						? 'Загрузка'
						: data?.items.map((item) => <CartItem {...item} />)}
				</div>
			</div>
			<div className={styles.side}>
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
					<span className={styles.text}>444 ₽</span>
				</div>
				<button className={styles.action}>Начать оформление</button>
			</div>
		</div>
	)
}
