'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { PostFormType, PostType } from '@/types/post.types'

import { useForm, type SubmitHandler } from 'react-hook-form'
import dynamic from 'next/dynamic'
const JoditEditor = dynamic(() => import('jodit-react'), {
	ssr: false,
	loading: () => <Skeleton />
})

import { Skeleton } from './Skeleton'
import { Button } from '@/components/ui/Button'
import { Field } from '@/components/ui/Field'

import { ROUTE } from '@/config/routes.config'
import { useCreatePost } from '@/hooks/useCreatePost'

import styles from './WriteForm.module.scss'
import { useUpdatePost } from '@/hooks/useUpdatePost'

export const WriteForm = ({ post }: { post?: PostType }) => {
	const router = useRouter()
	const [content, setContent] = React.useState(post?.content || '')

	const { register, handleSubmit, reset } = useForm<PostFormType>({
		defaultValues: {
			title: post?.title,
			content: post?.content
		}
	})

	const {
		mutate: createPost,
		isPending: isCreatePostPending,
		isSuccess: isCreatePostSuccess
	} = useCreatePost()
	const {
		mutate: updatePost,
		isPending: isUpdatePostPending,
		isSuccess: isUpdatePostSuccess
	} = useUpdatePost()

	const isPending = isCreatePostPending || isUpdatePostPending
	const isSuccess = isCreatePostSuccess || isUpdatePostSuccess

	const onSubmit: SubmitHandler<PostFormType> = (data) => {
		const form: PostFormType = {
			title: data.title,
			content
		}

		if (post?.id) {
			updatePost(
				{ id: post.id, data: form },
				{
					onSuccess: () => {
						router.push(`${ROUTE.BLOG}/${post.id}`)
					}
				}
			)
		} else {
			createPost(form, {
				onSuccess: (data) => {
					router.push(`${ROUTE.BLOG}/${data.id}`)
				}
			})
		}
	}

	return (
		<div className={styles.container}>
			<form
				className={styles.form}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className={styles.fields}>
					<div className={styles.title}>
						<Field
							extra='font-bold'
							id='title'
							label='Заголовок'
							placeholder='Введите название статьи'
							{...register('title')}
							defaultValue={post?.title}
						/>
					</div>
					<JoditEditor
						value={content}
						onChange={(e) => setContent(e)}
					/>
				</div>
				<div className={styles.controls}>
					<Button
						type='submit'
						isLoading={isPending || isSuccess}
					>
						{post?.id ? 'Отредактировать' : 'Опубликовать'}
					</Button>
					<Button
						variant='outlined'
						type='button'
						isLoading={isPending || isSuccess}
						onClick={router.back}
					>
						Назад
					</Button>
				</div>
			</form>
		</div>
	)
}
