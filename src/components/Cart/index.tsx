'use client'

import React from 'react'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Sidebar } from './sidebar'
import {
	CartItem,
	CartItemSkeleton,
	AuthForm,
	OrderForm,
	EmptyBlock
} from '@/components'
import { orderSchema } from '@/schemas'

import { useCartStore } from '@/store/cart'
import { useUserStore } from '@/store/user'
import { useCart } from '@/hooks/useCart'
import { useModal } from '@/hooks/useModal'
import { useProfile } from '@/hooks/useProfile'
import { useCreateOrder } from '@/hooks/useCreateOrder'

import {
	type OrderFormType,
	GettingType,
	PaymentType
} from '@/types/order.types'

import styles from './cart.module.scss'

export const Cart: React.FC = () => {
	const { onOpen } = useModal()
	const { isProfileSuccess } = useProfile()
	const { isCartLoading } = useCart()
	const { createOrder } = useCreateOrder()

	const { user } = useUserStore()
	const { items } = useCartStore()

	const methods = useForm<OrderFormType>({
		mode: 'onSubmit',
		resolver: zodResolver(orderSchema),
		defaultValues: {
			customerName: '',
			customerEmail: '',
			customerPhone: '',
			paymentMethod: PaymentType.CASH,
			gettingMethod: GettingType.PICKUP
		}
	})

	React.useEffect(() => {
		if (user) {
			methods.reset({
				customerName: user.name,
				customerEmail: user.email,
				customerPhone: user.phone
			})
		}
	}, [isProfileSuccess])

	const onSubmit = (data: OrderFormType) => {
		console.log('order-form', data)

		!user ? onOpen(<AuthForm />) : createOrder(data)
	}

	return (
		<FormProvider {...methods}>
			<form
				className={styles.container}
				onSubmit={methods.handleSubmit(onSubmit)}
			>
				<div className={styles.list}>
					<div className={styles.items}>
						{isCartLoading
							? [...new Array(3)].map((_, index) => (
									<CartItemSkeleton key={index} />
								))
							: items.map((item) => (
									<CartItem
										key={item.id}
										{...item}
									/>
								))}
					</div>
					{!isCartLoading && items.length === 0 && (
						<EmptyBlock
							title='Похоже, в вашей корзине ничего нет'
							description='Вы можете найти нужный товар в каталоге или через поиск'
						/>
					)}
					{!isCartLoading && items.length > 0 && <OrderForm />}
				</div>
				<Sidebar />
			</form>
		</FormProvider>
	)
}