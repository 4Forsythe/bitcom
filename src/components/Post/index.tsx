'use client'

import clsx from 'clsx'
import { Clock, Eye, MessageSquare, NotebookPen, Trash } from 'lucide-react'

import { useUserStore } from '@/store/user.store'

import type { PostType } from '@/types/post.types'

import { formatDate } from '@/utils/format-date'
import { calcNounDate } from '@/utils/calc-noun-date'
import { calcReadingTime } from '@/utils/calc-reading-time'

import styles from './Post.module.scss'
import { useDeletePost } from '@/hooks/useDeletePost'
import Link from 'next/link'
import { ROUTE } from '@/config/routes.config'
import { useRouter } from 'next/navigation'

export const Post = ({
	id,
	title,
	content,
	imageUrl,
	views,
	createdAt,
	updatedAt
}: PostType) => {
	const router = useRouter()

	const isUpdated = formatDate(createdAt) !== formatDate(updatedAt)

	const { user } = useUserStore()
	const { mutate, isPending, isSuccess } = useDeletePost()

	const onCreateMarkup = (content: string) => {
		return { __html: content }
	}

	const onRemove = () => {
		mutate(id)
		router.back()
	}

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1 className={styles.title}>{title}</h1>
				{user?.role && (
					<div className={clsx(styles.controls, 'animate-opacity')}>
						<Link
							href={`${ROUTE.EDITOR}/${id}`}
							className={styles.control}
						>
							Изменить <NotebookPen className={styles.icon} />
						</Link>
						<button
							className={styles.control}
							onClick={onRemove}
						>
							Удалить <Trash className={styles.icon} />
						</button>
					</div>
				)}
			</div>
			<div className={styles.information}>
				<div className={styles.meta}>
					<span className={styles.tag}>
						{isUpdated
							? `Изменено ${calcNounDate(updatedAt)}`
							: `Опубликовано ${calcNounDate(createdAt)}`}
					</span>
					<div className={styles.tag}>
						<Eye className={styles.icon} />
						<span className={styles.text}>{views}</span>
					</div>
					<div className={styles.tag}>
						<Clock className={styles.icon} />
						<span className={styles.text}>{calcReadingTime(content)} мин</span>
					</div>
					<button className={styles.comment}>
						<MessageSquare className={styles.icon} />
						<span className={styles.text}>5</span>
					</button>
				</div>
			</div>
			<div
				className={styles.content}
				dangerouslySetInnerHTML={onCreateMarkup(content)}
			></div>
		</div>
	)
}
