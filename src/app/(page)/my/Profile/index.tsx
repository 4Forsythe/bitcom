'use client'

import React from 'react'

import clsx from 'clsx'
import { useForm, type SubmitHandler } from 'react-hook-form'

import { Skeleton } from './Skeleton'
import { Field } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'

import { useProfile } from '@/hooks/useProfile'
import { useUpdateProfile } from '@/hooks/useUpdateProfile'

import type { UserFormType } from '@/types/user.types'

import { formatPhone } from '@/utils/format-phone'

import styles from './Profile.module.scss'
import { errorCatch } from '@/api/error-catch'

export const Profile = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty, isSubmitted }
	} = useForm<UserFormType>({
		mode: 'onChange'
	})

	const { data, isLoading, isSuccess } = useProfile()
	const { mutate, error, isPending } = useUpdateProfile()

	const message = error ? errorCatch(error) : undefined

	React.useEffect(() => {
		if (data) {
			reset({
				id: data.id,
				name: data.name,
				phone: formatPhone(data.phone)
			})
		}
	}, [isSuccess])

	const onSubmit: SubmitHandler<UserFormType> = (data) => {
		mutate({
			name: data.name?.trim(),
			password: data.password?.trim() || undefined
		})
	}

	return (
		<div className={styles.container}>
			{isLoading ? (
				<Skeleton />
			) : (
				<form
					className={clsx(styles.form, 'animate-opacity')}
					onSubmit={handleSubmit(onSubmit)}
				>
					<span className={styles.message}>{message}</span>
					<Field
						id='id'
						label='Номер аккаунта'
						variant='outlined'
						placeholder='Идентификатор аккаунта'
						{...register('id')}
						readOnly
					/>
					<Field
						id='name'
						label='Ваше имя'
						{...register('name', {
							maxLength: {
								value: 38,
								message: 'Слишком длинное имя пользователя'
							}
						})}
						error={errors.name?.message}
						isLoading={isPending}
					/>
					<Field
						id='phone'
						label='Номер телефона'
						variant='outlined'
						type='number'
						{...register('phone')}
						readOnly
					/>
					<Field
						id='password'
						label='Сменить пароль'
						type='password'
						{...register('password', {
							minLength: {
								value: 6,
								message: 'Слишком длинное имя пользователя'
							},
							maxLength: {
								value: 32,
								message: 'Слишком длинное имя пользователя'
							}
						})}
						isLoading={isPending}
					/>
					<div className={styles.controls}>
						<Button
							variant={
								!isDirty || (!isDirty && isSubmitted) ? 'outlined' : 'contained'
							}
							type='submit'
							isLoading={isPending}
							disabled={!isDirty || (!isDirty && isSubmitted)}
						>
							Сохранить изменения
						</Button>
					</div>
				</form>
			)}
		</div>
	)
}
