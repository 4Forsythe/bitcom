'use client'

import {
	Controller,
	SubmitHandler,
	useForm,
	useFormContext
} from 'react-hook-form'
import styles from './OrderForm.module.scss'
import { Field } from '../ui/Field'
import { GettingType, OrderFormType, PaymentType } from '@/types/order.types'
import { Badge } from '../ui/Badge'
import { InfoBlock } from '../ui/InfoBlock'
import { Placemark, YMaps, Map } from 'react-yandex-maps'
import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import { ROUTE } from '@/config/routes.config'
import { PaymentItem } from './PaymentItem'

export const OrderForm = () => {
	const {
		register,
		handleSubmit,
		getValues,
		control,
		formState: { isValid, errors }
	} = useFormContext<OrderFormType>()

	const { data: cart, isLoading } = useCart()

	const avails = cart?.items.reduce(
		(count, item) => count + item.product.count,
		0
	)

	// const onSubmit: SubmitHandler<OrderFormType> = (data) => {
	// 	console.log(data)
	// }

	return (
		<div className={styles.container}>
			<form
				className={styles.form}
				// onSubmit={handleSubmit(onSubmit)}
			>
				<div className={styles.fields}>
					<h5 className={styles.title}>Данные получателя</h5>
					<div className={styles.field}>
						<Field
							id='name'
							label='Получатель*'
							className={styles.input}
							maxLength={144}
							placeholder='Фамилия, имя, отчество'
							error={errors?.customerName?.message}
							{...register('customerName', {
								required: 'Это обязательное поле',
								maxLength: {
									value: 144,
									message: 'Слишком длинное значение'
								}
							})}
						/>
					</div>
					<div className={styles.field}>
						<Field
							id='email'
							label='E-mail*'
							className={styles.input}
							placeholder='Электронная почта'
							error={errors?.customerEmail?.message}
							{...register('customerEmail', {
								required: 'Это обязательное поле',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: 'Неправильный формат эл. почты'
								}
							})}
						/>
						<Field
							id='phone'
							label='Телефон*'
							className={styles.input}
							type='number'
							placeholder='8 (XXX) XXX XX-XX'
							error={errors?.customerPhone?.message}
							{...register('customerPhone', {
								required: 'Это обязательное поле'
							})}
						/>
					</div>
				</div>
				<div className={styles.fields}>
					<h5 className={styles.title}>Способ оплаты</h5>
					<Controller
						name='payment'
						control={control}
						defaultValue={PaymentType.ONLINE}
						render={({ field }) => (
							<>
								<div className={styles.selector}>
									<Badge
										variant={
											field.value === PaymentType.ONLINE
												? 'contained'
												: 'outlined'
										}
										onClick={() => field.onChange(PaymentType.ONLINE)}
									>
										{PaymentType.ONLINE}
									</Badge>
									<Badge
										variant={
											field.value === PaymentType.CASH
												? 'contained'
												: 'outlined'
										}
										onClick={() => field.onChange(PaymentType.CASH)}
									>
										{PaymentType.CASH}
									</Badge>
								</div>
								{field.value === PaymentType.ONLINE && (
									<div className={styles.payments}>
										<PaymentItem
											type='Банковской картой'
											imageUrl='static/sber-logo.svg'
										/>
									</div>
								)}
								{field.value === PaymentType.CASH && (
									<InfoBlock>
										На данный момент оплатить заказ можно только при получении в
										магазине
									</InfoBlock>
								)}
							</>
						)}
					/>
				</div>
				<div className={styles.fields}>
					<h5 className={styles.title}>Способ получения</h5>
					<Controller
						control={control}
						name='getting'
						defaultValue={GettingType.PICKUP}
						render={({ field }) => (
							<Badge
								variant={
									field.value === GettingType.PICKUP ? 'contained' : 'outlined'
								}
								onClick={() => field.onChange(GettingType.PICKUP)}
							>
								{GettingType.PICKUP}
							</Badge>
						)}
					/>
					<div className={styles.getting}>
						<div className={styles.details}>
							<div className={styles.address}>
								<h5 className={styles.location}>
									Тольятти, бульвар Кулибина 6А
								</h5>
								<span className={styles.text}>
									вход со стороны магазина «БитКом»
								</span>
								<span className={styles.working}>пн-пт с 9:30 до 18:00</span>
							</div>
							<span className={styles.avails}>
								{avails ? `В наличии ${avails} шт.` : 'Нет в наличии'}
							</span>
						</div>
						<YMaps>
							<Map
								className={styles.map}
								state={{
									center: [53.534416, 49.269815],
									zoom: 15,
									behaviors: ['drag']
								}}
							>
								<Placemark
									geometry={[53.534416, 49.269815]}
									options={{
										iconLayout: 'default#image',
										iconImageHref: '/icons/Marker.svg',
										iconImageSize: [42, 42],
										iconImageOffset: [-42, -42]
									}}
								/>
							</Map>
						</YMaps>
					</div>
				</div>
				<p className={styles.policy}>
					Нажимая кнопку "Оформить заказ", Вы соглашаетесь с условиями{' '}
					<Link
						className={styles.link}
						href={ROUTE.POLICIES}
						target='_blank'
					>
						политики конфиднциальности
					</Link>
				</p>
			</form>
		</div>
	)
}
