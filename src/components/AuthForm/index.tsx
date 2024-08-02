'use client'

import React from 'react'
import Link from 'next/link'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, X } from 'lucide-react'
import {
	Controller,
	SubmitHandler,
	useForm,
	useFormContext
} from 'react-hook-form'

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
import { useUpdateProfile } from '@/hooks/useUpdateProfile'

enum AuthStage {
	PHONE = 'Phone',
	SMS_CODE = 'SMS Code',
	PASSWORD = 'Password'
}

enum AuthMethod {
	LOGIN = 'Login',
	REGISTER = 'Register'
}

export const AuthForm = () => {
	const [cooldown, setCooldown] = React.useState(0)
	const [stage, setStage] = React.useState<AuthStage>(AuthStage.PHONE)
	const [method, setMethod] = React.useState<AuthMethod | null>(null)

	const queryClient = useQueryClient()

	const { onClose } = useModal()
	const { setUser } = useUserStore()

	const {
		register,
		watch,
		reset,
		handleSubmit,
		getValues,
		control,
		formState: { isValid, errors }
	} = useForm<AuthFormType>({ mode: 'onSubmit' })

	const {
		mutate: mutateRegister,
		isPending: isRegisterPending,
		error: registerError
	} = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: AuthFormType) => authService.register(data),
		onSuccess: () => {
			setMethod(AuthMethod.REGISTER)
			setStage(AuthStage.SMS_CODE)
		},
		onError: (error) => {
			const message = errorCatch(error) === 'Неверный формат номера телефона'

			if (!message) {
				setMethod(AuthMethod.LOGIN)
				setStage(AuthStage.PASSWORD)
			}
		}
	})

	const { mutate: mutateSending, isPending: isSendingPending } = useMutation({
		mutationKey: ['send code'],
		mutationFn: (phone: string) =>
			authService.verify({
				phone
			}),
		onError: (error) => {
			const message = errorCatch(error)
			if (message) {
				const match = message.match(/Повторите попытку через (\d+) сек./)
				if (match) {
					setCooldown(parseInt(match[1], 10))
				}
			}
		},
		onSuccess: () => {
			setStage(AuthStage.SMS_CODE)
		}
	})

	const {
		mutate: mutateLogin,
		isPending: isLoginPending,
		error: loginError
	} = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: AuthFormType) => authService.login(data),
		retry: 0,
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			setUser(response.data.user)
			if (method === AuthMethod.LOGIN) {
				onClose()
			} else {
				setMethod(AuthMethod.REGISTER)
				setStage(AuthStage.PASSWORD)
			}
		}
	})

	const { mutate: mutateProfile } = useUpdateProfile()

	const isPending = isRegisterPending || isSendingPending || isLoginPending
	const loginErrorMessage = loginError ? errorCatch(loginError) : undefined
	const registerErrorMessage = registerError
		? errorCatch(registerError)
		: undefined

	console.log(registerErrorMessage)

	const onSubmit: SubmitHandler<AuthFormType> = (data: AuthFormType) => {
		const phone = data.phone.replace(/[^\d]/g, '')
		const dto = { ...data, phone }

		if (stage === AuthStage.PHONE) {
			mutateRegister({
				phone: dto.phone
			})
		} else if (stage === AuthStage.SMS_CODE) {
			mutateLogin({
				phone: dto.phone,
				code: Number(dto.code)
			})
		} else if (stage === AuthStage.PASSWORD) {
			if (method === AuthMethod.LOGIN) {
				mutateLogin({ phone: dto.phone, password: dto.password })
			} else {
				mutateProfile({ password: dto.password })
				onClose()
			}
		}
	}

	const onResendCode = () => {
		const phone = getValues().phone.replace(/[^\d]/g, '')

		if (phone) {
			mutateSending(phone)
		}
	}

	const onBack = () => {
		if (stage === AuthStage.PASSWORD) {
			setStage(AuthStage.PHONE)
		} else if (stage === AuthStage.SMS_CODE) {
			if (method === AuthMethod.LOGIN) {
				setStage(AuthStage.PASSWORD)
			} else {
				setStage(AuthStage.PHONE)
			}
		}
	}

	return (
		<div className={styles.container}>
			<form
				className={styles.form}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className={styles.head}>
					{stage === AuthStage.PHONE && (
						<>
							<span className={styles.title}>Войти или</span>
							<span className={styles.title}>зарегистрироваться</span>
						</>
					)}
					{stage === AuthStage.SMS_CODE && (
						<>
							<span className={styles.title}>Введите код</span>
							<span className={styles.title}>подтверждения</span>
						</>
					)}
					{stage === AuthStage.PASSWORD && method === AuthMethod.LOGIN && (
						<span className={styles.title}>Введите пароль</span>
					)}
					{stage === AuthStage.PASSWORD && method === AuthMethod.REGISTER && (
						<span className={styles.title}>Придумайте пароль</span>
					)}
				</div>
				<div className={styles.field}>
					{stage === AuthStage.PHONE && (
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
									error={
										errors?.phone?.message ||
										(registerErrorMessage ?? registerErrorMessage)
									}
									onChange={(e) => field.onChange(formatPhone(e.target.value))}
									type='text'
									autoComplete='off'
									placeholder='Введите номер телефона'
								/>
							)}
						/>
					)}
					{stage === AuthStage.SMS_CODE && (
						<Field
							id='code'
							className={styles.input}
							type='number'
							maxLength={6}
							autoComplete='off'
							placeholder='Введите код из СМС'
							error={
								errors?.code?.message ||
								(loginErrorMessage ?? loginErrorMessage)
							}
							{...register('code', {
								required: false,
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
					{stage === AuthStage.PASSWORD && (
						<Field
							id='password'
							className={styles.input}
							type='password'
							maxLength={32}
							autoComplete='off'
							placeholder={
								method === AuthMethod.REGISTER
									? 'Придумайте пароль'
									: 'Введите пароль'
							}
							error={errors?.password?.message || loginErrorMessage}
							{...register('password', {
								required: false,
								minLength: {
									value: 6,
									message: 'Мин. длина пароля - 6 символов'
								},
								maxLength: {
									value: 32,
									message: 'Макс. длина пароля - 32 символа'
								}
							})}
						/>
					)}
				</div>
				<div className={styles.buttons}>
					<Button
						type='submit'
						disabled={isPending}
					>
						{stage === AuthStage.SMS_CODE ? 'Подтвердить код' : 'Войти'}
					</Button>
					{cooldown > 0 && (
						<CooldownTimer
							seconds={cooldown}
							onEnd={() => setCooldown(0)}
						/>
					)}
					{!cooldown && stage === AuthStage.SMS_CODE && (
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
					{stage === AuthStage.PHONE ? '"Войти"' : '"Подтвердить код"'}, Вы
					соглашаетесь с условиями{' '}
					<Link
						className={styles.link}
						href={ROUTE.POLICIES}
						target='_blank'
					>
						политики конфиднциальности
					</Link>
				</p>
			</form>
			<div className={styles.controls}>
				{stage === AuthStage.SMS_CODE && (
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
