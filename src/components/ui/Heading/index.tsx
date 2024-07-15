'use client'

import { useRouter } from 'next/navigation'

import { ChevronLeft } from 'lucide-react'

import styles from './Heading.module.scss'

interface HeadingProps {
	title: string
	back?: boolean
}

export const Heading = ({ title, back }: HeadingProps) => {
	const router = useRouter()

	return (
		<div className={styles.container}>
			{back && (
				<button
					className={styles.back}
					onClick={() => router.back()}
				>
					<ChevronLeft className={styles.icon} />
				</button>
			)}
			<h1 className={styles.title}>{title}</h1>
		</div>
	)
}
