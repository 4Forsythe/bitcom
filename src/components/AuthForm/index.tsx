'use client'

import React from 'react'
import Link from 'next/link'

import { useMutation, useQuery } from '@tanstack/react-query'
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
import { errorCatch } from '@/api/error-catch'
import { CooldownTimer } from '../ui/CooldownTimer'
import { useUserStore } from '@/store/user.store'
import { userService } from '@/services/user.service'

enum AuthStageEnum {
	PHONE = 'Phone',
	PASSWORD = 'Password',
	SMS_CODE = 'SMS Code'
}

export const AuthForm = () => {
	const [cooldown, setCooldown] = React.useState(0)
	const [stage, setStage] = React.useState<AuthStageEnum>(AuthStageEnum.PHONE)

	const { onClose } = useModal()

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		control,
		formState: { isValid, errors }
	} = useForm<AuthFormType>()

	const { mutate: mutateRegister, isPending: isRegisterPending } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: AuthFormType) => authService.register(data),
		onSuccess: () => {
			setStage(AuthStageEnum.SMS_CODE)
		}
	})

	const { mutate: mutateSending, isPending: isSendingPending } = useMutation({
		mutationKey: ['send code'],
		mutationFn: (phone: string) =>
			authService.verify({
				phone
			}),
		onError: (error: any) => {
			const message = errorCatch(error)

			if (message) {
				const match = message.match(/Повторите попытку через (\d+) сек./)
				if (match) {
					setCooldown(parseInt(match[1], 10))
				}
			}
		},
		onSuccess: () => {
			setStage(AuthStageEnum.SMS_CODE)
		}
	})

	const {
		mutate: mutateLogin,
		isPending: isLoginPending,
		error: loginError
	} = useLogin(onClose)

	const isPending = isRegisterPending || isSendingPending || isLoginPending
	const loginErrorMessage = loginError ? errorCatch(loginError) : undefined

	const onSubmit: SubmitHandler<AuthFormType> = async (data: AuthFormType) => {
		const phone = data.phone.replace(/[^\d]/g, '')
		const dto = { ...data, phone }

		if (stage === AuthStageEnum.PHONE) {
			mutateRegister({
				name: dto.name || undefined,
				phone: dto.phone
			})

			mutateSending(dto.phone)
		} else if (stage === AuthStageEnum.SMS_CODE) {
			mutateLogin({
				phone: dto.phone,
				code: Number(dto.code)
			})
		}
	}

	const onResendCode = () => {
		const phone = getValues().phone.replace(/[^\d]/g, '')

		if (phone) {
			mutateSending(phone)
		}
	}

	const onBack = () => {
		setStage(AuthStageEnum.PHONE)
	}

	return (
		<div className={styles.container}>
			<form
				className={styles.form}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className={styles.head}>
					{stage === AuthStageEnum.PHONE && (
						<>
							<span className={styles.title}>Войти или</span>
							<span className={styles.title}>зарегистрироваться</span>
						</>
					)}
					{stage === AuthStageEnum.SMS_CODE && (
						<>
							<span className={styles.title}>Введите код</span>
							<span className={styles.title}>подтверждения</span>
						</>
					)}
				</div>
				<div className={styles.field}>
					{stage === AuthStageEnum.PHONE && (
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
									error={errors?.phone?.message}
									onChange={(e) => field.onChange(formatPhone(e.target.value))}
									type='text'
									autoComplete='off'
									placeholder='Введите номер телефона'
								/>
							)}
						/>
					)}
					{stage === AuthStageEnum.SMS_CODE && (
						<Field
							id='code'
							className={styles.input}
							type='number'
							maxLength={6}
							autoComplete='off'
							placeholder='Введите код из СМС'
							error={loginErrorMessage}
							{...register('code', {
								required: 'Это обязательное поле',
								minLength: {
									value: 6,
									message: 'Длина кода - 6 символов'
								},
								maxLength: {
									value: 6,
									message: 'Длина кода - 6 символов'
								}
							})}
						/>
					)}
				</div>
				{cooldown > 0 && (
					<CooldownTimer
						seconds={cooldown}
						onEnd={() => setCooldown(0)}
					/>
				)}
				<div className={styles.buttons}>
					{!cooldown && (
						<Button
							type='submit'
							disabled={!isValid || isPending}
						>
							{stage === AuthStageEnum.PHONE ? 'Войти' : 'Подтвердить код'}
						</Button>
					)}
					{!cooldown && stage === AuthStageEnum.SMS_CODE && (
						<Button
							type='button'
							variant='outlined'
							disabled={isPending}
							onClick={onResendCode}
						>
							Получить код еще раз
						</Button>
					)}
				</div>
				<p className={styles.policy}>
					Нажимая кнопку{' '}
					{stage === AuthStageEnum.PHONE ? '"Войти"' : '"Подтвердить код"'}, Вы
					соглашаетесь с условиями{' '}
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
				{stage === AuthStageEnum.SMS_CODE && (
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
