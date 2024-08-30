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
import {
	EMAIL,
	PHONE,
	SECOND_EMAIL,
	SECOND_PHONE
} from '@/constants/contacts.constants'
import { OrderForm } from '@/components/OrderForm'
import Link from 'next/link'
import { ROUTE } from '@/config/routes.config'
import { FormProvider, useForm } from 'react-hook-form'
import { OrderFormType } from '@/types/order.types'
import { Sidebar } from './Sidebar'

export const Cart = () => {
	const { data, isLoading } = useCart()

	const methods = useForm<OrderFormType>({ mode: 'onChange' })

	return (
		<FormProvider {...methods}>
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
					{data?.items && data.items.length > 0 && <OrderForm />}
				</div>
				<Sidebar />
			</div>
		</FormProvider>
	)
}
