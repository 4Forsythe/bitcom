import { type LucideIcon, MessagesSquare } from 'lucide-react'

import styles from './Banner.module.scss'
import clsx from 'clsx'

export interface BannerProps {
	title: string
	description: string
	action?: React.ReactNode
	color: string
	icon: LucideIcon
}

export const Banner = ({
	title,
	description,
	action,
	color,
	icon: Icon
}: BannerProps) => {
	const onCreateMarkup = (content: string) => {
		return { __html: content }
	}

	return (
		<div
			className={clsx(styles.container, 'animate-opacity')}
			style={{ backgroundColor: color }}
		>
			<div className={styles.cover}>
				<Icon className={styles.icon} />
			</div>
			<section className={styles.inner}>
				<h5 className={styles.title}>{title}</h5>
				<p
					className={styles.description}
					dangerouslySetInnerHTML={onCreateMarkup(description)}
				></p>
				{action && <div className={styles.action}>{action}</div>}
			</section>
		</div>
	)
}
