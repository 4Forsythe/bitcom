import Link from 'next/link'

import { Button } from '@/components/ui/Button'

import { ROUTE } from '@/config/routes.config'

import styles from './EmptyBlock.module.scss'
import { Database, Package } from 'lucide-react'

interface EmptyBlockProps {
	title: string
	description?: string
}

export const EmptyBlock = ({ title, description }: EmptyBlockProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.block}>
				<Database className={styles.icon} />
				<span className={styles.title}>{title}</span>
				<p className={styles.description}>{description}</p>
				<div className={styles.controls}>
					<Link href={ROUTE.HOME}>
						<Button variant='outlined'>На главную</Button>
					</Link>
					<Link href={ROUTE.CATALOG}>
						<Button>Каталог</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
