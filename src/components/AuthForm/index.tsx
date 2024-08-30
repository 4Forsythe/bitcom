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

import type {
	AuthFormType,
	LoginFormType,
	RegisterFormType
} from '@/types/auth.types'

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
import { ErrorMessage } from '../ui/ErrorMessage'

enum AuthMethod {
	LOGIN = 'Login',
	REGISTER = 'Register',
	VERIFY = 'Verify'
}

export const AuthForm = () => {
	const [cooldown, setCooldown] = React.useState(0)
	const [method, setMethod] = React.useState<AuthMethod>(AuthMethod.LOGIN)

	const queryClient = useQueryClient()

	const { onClose } = useModal()
	const { setUser } = useUserStore()

	const {
		register,
		handleSubmit,
		getValues,
		control,
		formState: { isValid, errors }
	} = useForm<AuthFormType>({ mode: 'onChange' })

	const {
		mutate: mutateRegister,
		isPending: isRegisterPending,
		error: registerError
	} = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: AuthFormType) => authService.register(data),
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			setUser(response.data.user)
			onClose()
		}
	})

	const {
		mutate: mutateSending,
		isPending: isSendingPending,
		error: sendingError
	} = useMutation({
		mutationKey: ['send code'],
		mutationFn: (email: string) => authService.sendCode({ email }),
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
			setMethod(AuthMethod.VERIFY)
		}
	})

	const {
		mutate: mutateLogin,
		isPending: isLoginPending,
		error: loginError
	} = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: AuthFormType) => authService.login(data),
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			setUser(response.data.user)
			onClose()
		}
	})

	const {
		mutate: mutateVerify,
		isPending: isVerifyPending,
		error: verifyError
	} = useMutation({
		mutationKey: ['verify'],
		mutationFn: (data: AuthFormType) =>
			authService.verify({ email: data.email, code: Number(data.code) }),
		onSuccess: (response) => {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			console.log('res', response.data)
			setUser(response.data)
			onClose()
		}
	})

	const isPending =
		isRegisterPending || isLoginPending || isSendingPending || isVerifyPending

	const loginErrorMessage = loginError ? errorCatch(loginError) : undefined
	const registerErrorMessage = registerError
		? errorCatch(registerError)
		: undefined
	const sendingErrorMessage = sendingError
		? errorCatch(sendingError)
		: undefined

	const onSubmit: SubmitHandler<AuthFormType> = (data: AuthFormType) => {
		// const phone = data.phone.replace(/[^\d]/g, '')
		// const dto = { ...data, phone }

		if (method === AuthMethod.LOGIN) {
			mutateLogin({
				email: data.email,
				password: data.password
			})
		}

		if (method === AuthMethod.REGISTER) {
			mutateSending(data.email)
		}

		if (method === AuthMethod.VERIFY) {
			mutateRegister({
				name: data.name,
				code: Number(data.code),
				email: data.email,
				password: data.password
			})
		}
	}

	const onBack = () => {
		if (method === AuthMethod.VERIFY) setMethod(AuthMethod.REGISTER)
	}

	const onResendCode = () => {
		const email = getValues().email

		if (email) {
			mutateSending(email)
		}
	}

	return (
		<div className={styles.container}>
			<form
				className={styles.form}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className={styles.head}>
					{method !== AuthMethod.VERIFY && (
						<>
							<span className={styles.title}>Войти или</span>
							<span className={styles.title}>зарегистрироваться</span>
						</>
					)}
					{method === AuthMethod.VERIFY && (
						<>
							<span className={styles.title}>Введите код</span>
							<span className={styles.title}>подтверждения</span>
						</>
					)}
				</div>
				<div className={styles.inner}>
					{method === AuthMethod.LOGIN && (
						<>
							{loginErrorMessage && (
								<ErrorMessage>{loginErrorMessage}</ErrorMessage>
							)}
							<div className={styles.fields}>
								<Field
									id='email'
									className={styles.input}
									error={errors?.email?.message}
									type='text'
									placeholder='Электронная почта'
									{...register('email', {
										required: 'Это обязательное поле',
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
											message: 'Неправильный формат эл. почты'
										}
									})}
								/>
								<Field
									id='password'
									className={styles.input}
									error={errors?.password?.message}
									type='password'
									placeholder='Пароль (обязательно)'
									{...register('password', {
										required: 'Это обязательное поле',
										minLength: {
											value: 5,
											message: 'Слишком короткий пароль'
										},
										maxLength: {
											value: 32,
											message: 'Слишком длинный пароль'
										}
									})}
								/>
							</div>
						</>
					)}
					{method === AuthMethod.REGISTER && (
						<div className={styles.fields}>
							{sendingErrorMessage && (
								<ErrorMessage>{sendingErrorMessage}</ErrorMessage>
							)}
							<Field
								id='name'
								className={styles.input}
								error={errors?.name?.message}
								type='text'
								placeholder='Имя (необязательно)'
								{...register('name', {
									required: false,
									maxLength: {
										value: 48,
										message: 'Слишком длинное имя'
									}
								})}
							/>
							<Field
								id='email'
								className={styles.input}
								error={errors?.email?.message}
								type='text'
								placeholder='Электронная почта'
								{...register('email', {
									required: 'Это обязательное поле',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
										message: 'Неправильный формат эл. почты'
									}
								})}
							/>
							<Field
								id='password'
								className={styles.input}
								error={errors?.password?.message}
								type='password'
								placeholder='Пароль (обязательно)'
								{...register('password', {
									required: 'Это обязательное поле',
									minLength: {
										value: 5,
										message: 'Слишком короткий пароль'
									},
									maxLength: {
										value: 32,
										message: 'Слишком длинный пароль'
									}
								})}
							/>
						</div>
					)}
					{method === AuthMethod.VERIFY && (
						<div className={styles.fields}>
							{registerErrorMessage && (
								<ErrorMessage>{registerErrorMessage}</ErrorMessage>
							)}
							<span className={styles.text}>
								Проверьте письмо на почтовом ящике {getValues().email}.
							</span>
							<Field
								id='code'
								className={styles.input}
								type='number'
								maxLength={6}
								autoComplete='off'
								placeholder='Введите код из письма'
								error={errors?.code?.message}
								{...register('code', {
									required: true,
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
						</div>
					)}
				</div>
				<div className={styles.buttons}>
					<Button
						type='submit'
						isLoading={isPending}
					>
						{method === AuthMethod.VERIFY
							? 'Подтвердить'
							: method === AuthMethod.REGISTER
								? 'Зарегистрироваться'
								: 'Войти'}
					</Button>
					{method === AuthMethod.LOGIN && (
						<Button
							type='button'
							variant='outlined'
							onClick={() => setMethod(AuthMethod.REGISTER)}
							isLoading={isPending}
						>
							Зарегистрироваться
						</Button>
					)}
					{method === AuthMethod.REGISTER && (
						<Button
							type='button'
							variant='outlined'
							onClick={() => setMethod(AuthMethod.LOGIN)}
							isLoading={isPending}
						>
							Войти
						</Button>
					)}
					{cooldown > 0 && (
						<CooldownTimer
							seconds={cooldown}
							onEnd={() => setCooldown(0)}
						/>
					)}
					{!cooldown && method === AuthMethod.VERIFY && (
						<Button
							type='button'
							variant='outlined'
							onClick={onResendCode}
							isLoading={isPending}
						>
							Отправить еще раз
						</Button>
					)}
				</div>
				<p className={styles.policy}>
					Нажимая кнопку{' '}
					{method === AuthMethod.REGISTER
						? '"Зарегистрироваться"'
						: method === AuthMethod.LOGIN
							? '"Войти"'
							: '"Подтвердить код"'}
					, Вы соглашаетесь с условиями{' '}
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
				{method === AuthMethod.VERIFY && (
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
