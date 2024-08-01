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
	const { data, isLoading } = useCart()

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
				<div className={clsx(styles.block, 'animate-opacity')}>
					<div className={styles.summary}>
						<div className={styles.amount}>
							<span className={styles.total}>Итого</span>
							<span className={styles.text}>
								{data?.count
									? calcNounDeclension(
											data?.count,
											'товар',
											'товара',
											'товаров'
										)
									: 'Нет товаров'}
							</span>
						</div>
						<span className={styles.text}>{data?.total || 0} ₽</span>
					</div>
					<Button
						className={styles.action}
						variant='outlined'
						disabled
					>
						Начать оформление
					</Button>
				</div>
				<div className={styles.danger}>
					<span className={styles.text}>
						К сожалению, в данный момент у нас отсутствует возможность
						онлайн-оформления заказа.
						<br />
						Пожалуйста, обращайтесь к нам на линию:
						<br />
						8 (927) 783 90-22 или 8 (8482) 41 1212.
						<br />
						Вы также можете написать нам на почту: info@bitcom63.ru или
						bitcom63@yandex.ru.
					</span>
				</div>
			</div>
		</div>
	)
}
