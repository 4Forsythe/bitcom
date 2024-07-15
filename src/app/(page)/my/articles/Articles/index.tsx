'use client'

import React from 'react'

import clsx from 'clsx'
import { useForm, type SubmitHandler } from 'react-hook-form'

import { Field } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'

import { useProfile } from '@/hooks/useProfile'
import { useUpdateProfile } from '@/hooks/useUpdateProfile'

import type { UserFormType } from '@/types/user.types'

import { formatPhone } from '@/utils/format-phone'

import { AxiosError } from 'axios'
import { errorCatch } from '@/api/error-catch'

import styles from './Articles.module.scss'
import { useUserStore } from '@/store/user.store'
import { PostCard } from '@/components/PostCard'
import { useArticles } from '@/hooks/useArticles'
import { ArticleCard } from '@/components/ArticleCard'
import { Skeleton } from '@/components/ArticleCard/Skeleton'
import { Pagination } from '@/components/Pagination'
import { EmptyBlock } from '@/components/EmptyBlock'

export const Articles = () => {
	const { data, isLoading, isSuccess } = useArticles()

	if (isSuccess && !!!data?.items) {
		return (
			<div className={styles.container}>
				<EmptyBlock
					title='У вас пока нет статей'
					description='Напишите свой первый пост, чтобы в будущем здесь появлялось больше информации'
				/>
			</div>
		)
	}

	return (
		<div className={styles.container}>
			<div className={styles.list}>
				{isLoading
					? [...new Array(4)].map((item, index) => <Skeleton key={index} />)
					: data?.items.map((item) => (
							<ArticleCard
								key={item.id}
								{...item}
							/>
						))}
			</div>
			<Pagination total={data?.count} />
		</div>
	)
}
