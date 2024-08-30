import Link from 'next/link'
import Image from 'next/image'

import { Eraser, Eye, PencilLine, SquarePen, Trash2 } from 'lucide-react'

import { ROUTE } from '@/config/routes.config'
import { formatDate } from '@/utils/format-date'
import { calcNounDate } from '@/utils/calc-noun-date'

import type { PostType } from '@/types/post.types'

import styles from './ArticleCard.module.scss'
import clsx from 'clsx'
import { useDeletePost } from '@/hooks/useDeletePost'
import { useUserStore } from '@/store/user.store'
import { onCreateMarkup } from '@/utils/create-markup'

export const ArticleCard = ({
	id,
	title,
	content,
	imageUrl,
	views,
	createdAt,
	updatedAt
}: PostType) => {
	const isUpdated = formatDate(createdAt) !== formatDate(updatedAt)

	const { user } = useUserStore()
	const { mutate, isPending, isSuccess } = useDeletePost()

	const onRemove = () => {
		mutate(id)
	}

	return (
		<article className={clsx(styles.container, 'animate-opacity')}>
			<Link
				className={styles.cover}
				href={`${ROUTE.BLOG}/${id}`}
			>
				<Image
					className={styles.image}
					width={1000}
					height={1000}
					src={imageUrl || '/static/image-placeholder.png'}
					alt={title}
					priority
				/>
			</Link>
			<div className={styles.information}>
				<Link
					className={styles.title}
					href={`${ROUTE.BLOG}/${id}`}
				>
					{title}
				</Link>
				<div className={styles.details}>
					<span className={styles.timestamp}>
						{isUpdated
							? `Изменено ${calcNounDate(updatedAt)}`
							: `Опубликовано ${calcNounDate(createdAt)}`}
					</span>
					<span className={styles.views}>
						<Eye className={styles.icon} />
						{views}
					</span>
				</div>
				<p
					className={styles.description}
					dangerouslySetInnerHTML={onCreateMarkup(content)}
				/>
				{user?.role && (
					<div className={styles.controls}>
						<Link
							className={styles.control}
							href={`${ROUTE.EDITOR}/${id}`}
						>
							<PencilLine className={styles.icon} />
						</Link>
						<button
							className={styles.control}
							onClick={onRemove}
							disabled={isPending}
						>
							<Trash2 className={styles.icon} />
						</button>
					</div>
				)}
			</div>
		</article>
	)
}
