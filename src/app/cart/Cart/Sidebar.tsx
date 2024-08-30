import { SubmitHandler, useFormContext } from 'react-hook-form'
import styles from './Cart.module.scss'
import { OrderFormType } from '@/types/order.types'
import { useCart } from '@/hooks/useCart'
import { calcNounDeclension } from '@/utils/calc-noun-declension'
import { Button } from '@/components/ui/Button'
import {
	EMAIL,
	PHONE,
	SECOND_EMAIL,
	SECOND_PHONE
} from '@/constants/contacts.constants'
import Link from 'next/link'
import { ROUTE } from '@/config/routes.config'
import clsx from 'clsx'
import { useMutation } from '@tanstack/react-query'
import { emailService } from '@/services/email.service'
import { orderService } from '@/services/order.service'

export const Sidebar = () => {
	const { handleSubmit } = useFormContext<OrderFormType>()

	const { data: cart } = useCart()

	const {
		mutate: mutateOrder,
		isPending: isOrderPending,
		error: orderError
	} = useMutation({
		mutationKey: ['create order'],
		mutationFn: (data: OrderFormType) => orderService.create(data)
	})

	const onSubmit = handleSubmit((data) => {
		console.log(data)

		const dto = {
			...data,
			count: cart?.count,
			total: cart?.total
		}

		mutateOrder(dto)
	})

	return (
		<div className={styles.sidebar}>
			<div className={clsx(styles.block, 'animate-opacity')}>
				<div className={styles.summary}>
					<div className={styles.amount}>
						<span className={styles.total}>Итого</span>
						<span className={styles.text}>
							{cart?.count
								? calcNounDeclension(cart?.count, 'товар', 'товара', 'товаров')
								: 'Нет товаров'}
						</span>
					</div>
					<span className={styles.text}>{cart?.total || 0} ₽</span>
				</div>
				<Button
					className={styles.action}
					variant='outlined'
					type='submit'
					onClick={onSubmit}
				>
					Оформить заказ
				</Button>
			</div>
			<div className={styles.danger}>
				<span className={styles.text}>
					К сожалению, в данный момент у нас отсутствуют некоторые способы
					оплаты и доставки.
					<br />
					Пожалуйста, обращайтесь к нам на линию по вопросам оплаты и доставки в
					разные города:
					<br />
					{PHONE} или {SECOND_PHONE}.
					<br />
					Вы также можете написать нам на почту: {EMAIL} или {SECOND_EMAIL}.
				</span>
			</div>
		</div>
	)
}
