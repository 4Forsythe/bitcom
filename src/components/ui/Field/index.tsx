'use client'

import React from 'react'

import clsx from 'clsx'
import { CircleAlert, LoaderCircle, OctagonAlert } from 'lucide-react'

import styles from './Field.module.scss'

interface IField extends React.InputHTMLAttributes<HTMLInputElement> {
	id: string
	label?: string
	extra?: string
	variant?: 'contained' | 'outlined'
	error?: string
	type?: 'number' | 'text' | 'password'
	isLoading?: boolean
	placeholder?: string
}

export const Field = React.forwardRef<HTMLInputElement, IField>(
	(
		{
			id,
			label,
			className,
			variant = 'contained',
			error,
			type = 'text',
			placeholder,
			isLoading,
			...rest
		},
		ref
	) => {
		const allowOnlyNumbers = (event: React.KeyboardEvent<HTMLInputElement>) => {
			if (
				type === 'number' &&
				!/[0-9]/.test(event.key) &&
				event.key !== 'Tab' &&
				event.key !== 'Backspace' &&
				event.key !== 'Enter' &&
				event.key !== 'ArrowLeft' &&
				event.key !== 'ArrowRight'
			) {
				event.preventDefault()
			}
		}

		return (
			<div className={styles.container}>
				<div
					className={clsx(styles.element, {
						[styles.contained]: variant === 'contained',
						[styles.outlined]: variant === 'outlined',
						[styles.warned]: error,
						[styles.loaded]: isLoading
					})}
				>
					<label
						htmlFor={id}
						className={styles.label}
					>
						{label}
					</label>
					<input
						id={id}
						className={clsx(styles.input, className)}
						ref={ref}
						type={type !== 'number' ? type : 'text'}
						disabled={isLoading}
						placeholder={placeholder}
						onKeyDown={allowOnlyNumbers}
						autoComplete='off'
						{...rest}
					/>
					{isLoading && <LoaderCircle className={styles.loader} />}
				</div>
				{error && (
					<span className={styles.message}>
						<OctagonAlert className={styles.icon} /> {error}
					</span>
				)}
			</div>
		)
	}
)

Field.displayName = 'Field'
