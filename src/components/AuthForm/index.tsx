'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useMutation } from '@tanstack/react-query'
import { ArrowLeft, X } from 'lucide-react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useModal } from '@/hooks/useModal'

import { ROUTE } from '@/config/routes.config'
import { formatPhone } from '@/utils/format-phone'

import type { AuthFormType } from '@/types/auth.types'

import { authService } from '@/services/auth.service'

import styles from './AuthForm.module.scss'
import { useLogin } from '@/hooks/useLogin'
import { Field } from '../ui/Field'
import { Button } from '../ui/Button'

enum AuthStageEnum {
	ENTERING = 'entering',
	VERIFYING = 'verifying'
}

export const AuthForm = () => {
	const [stage, setStage] = React.useState<AuthStageEnum>(
		AuthStageEnum.ENTERING
	)

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { isValid }
	} = useForm<AuthFormType>()

	const { onClose } = useModal()

	const {
		mutate: mutateRegister,
		isPending: isRegisterPending,
		isSuccess: isRegisterSuccess,
		isError: isRegisterError
	} = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: AuthFormType) => authService.register(data)
	})

	const {
		mutate: mutateSending,
		isPending: isSendingPending,
		isError: isSendingError
	} = useMutation({
		mutationKey: ['send code'],
		mutationFn: (phone: string) =>
			authService.verify({
				phone
			})
	})

	const {
		mutate: mutateLogin,
		isPending: isLoginPending,
		isError: isLoginError,
		error: loginError
	} = useLogin(onClose)

	const onSubmit: SubmitHandler<AuthFormType> = (data: AuthFormType) => {
		console.log(data)

		const phone = data.phone.replace(/[^\d]/g, '')
		const dto = { ...data, phone }

		if (stage === AuthStageEnum.ENTERING) {
			mutateRegister({
				name: dto.name || undefined,
				phone: dto.phone
			})
			mutateSending(dto.phone)
			setStage(AuthStageEnum.VERIFYING)
		} else {
			mutateLogin({
				phone: dto.phone,
				code: Number(dto.code)
			})
		}
	}

	const onBack = () => {
		setStage(AuthStageEnum.ENTERING)
	}

	return (
		<div className={styles.container}>
			<form
				className={styles.form}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className={styles.head}>
					<span className={styles.title}>
						{stage === AuthStageEnum.ENTERING ? 'Войти или' : 'Подтвердите код'}
					</span>
					<span className={styles.title}>
						{stage === AuthStageEnum.ENTERING
							? 'зарегистрироваться'
							: 'подтверждения'}
					</span>
				</div>
				<div className={styles.field}>
					{stage === AuthStageEnum.ENTERING ? (
						<Controller
							name='phone'
							control={control}
							rules={{
								required: 'Это обязательное поле',
								minLength: {
									value: 16,
									message: 'Неверный формат номера телефона'
								},
								pattern: {
									value: /^8 \(\d{3}\) \d{3}-\d{4}$/,
									message:
										'Номер телефона должен быть в формате 8 (XXX) XXX-XXXX'
								}
							}}
							render={({ field }) => (
								<Field
									{...field}
									id='phone'
									className={styles.input}
									onChange={(e) => field.onChange(formatPhone(e.target.value))}
									type='text'
									autoComplete='off'
									placeholder='Введите номер телефона'
								/>
							)}
						/>
					) : (
						<Field
							id='code'
							className={styles.input}
							type='number'
							maxLength={6}
							autoComplete='off'
							placeholder='Введите код из СМС'
							{...register('code', {
								required: true,
								minLength: 6,
								maxLength: 6
							})}
						/>
					)}
				</div>
				<Button
					type='submit'
					disabled={!isValid}
				>
					{stage === AuthStageEnum.ENTERING
						? 'Отправить код'
						: 'Подтвердить код'}
				</Button>
				<p className={styles.policy}>
					Нажимая кнопку{' '}
					{stage === AuthStageEnum.ENTERING
						? '"Отправить код"'
						: '"Подтвердить код"'}
					, Вы соглашаетесь с условиями{' '}
					<Link
						className={styles.link}
						href={ROUTE.POLICY}
						target='_blank'
					>
						политики конфиднциальности
					</Link>
				</p>
			</form>
			<div className={styles.controls}>
				{stage === AuthStageEnum.VERIFYING && (
					<button
						className={styles.control}
						onClick={onBack}
					>
						<ArrowLeft className={styles.icon} />
					</button>
				)}
				<button
					className={styles.control}
					onClick={onClose}
				>
					<X className={styles.icon} />
				</button>
			</div>
		</div>
	)
}
