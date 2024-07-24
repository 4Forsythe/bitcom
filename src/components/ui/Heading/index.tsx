'use client'

import { useRouter } from 'next/navigation'

import { ChevronLeft } from 'lucide-react'

import styles from './Heading.module.scss'

interface HeadingProps {
	title: string
	control?: boolean
}

export const Heading = ({ title, control }: HeadingProps) => {
	const router = useRouter()

	return (
		<div className={styles.container}>
			{control && (
				<button
					className={styles.control}
					onClick={() => router.back()}
				>
					<ChevronLeft className={styles.icon} />
				</button>
			)}
			<h1 className={styles.title}>{title}</h1>
		</div>
	)
}
