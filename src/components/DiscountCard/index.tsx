import Link from 'next/link'

import { calcActionCountdown } from '@/utils/calc-action-countdown'
import { formatCase } from '@/utils/format-case'
import { calcNounDeclension } from '@/utils/calc-noun-declension'

import { ROUTE } from '@/config/routes.config'

import type { DiscountType } from '@/types/discount.types'

import styles from './DiscountCard.module.scss'
import { Skeleton } from './Skeleton'

export const DiscountCard = ({
	id,
	dateBegin,
	dateEnd,
	percent,
	target,
	targetId,
	type
}: DiscountType) => {
	// if (!percent) {
	// 	return <Skeleton />
	// }

	return (
		<article className={styles.container}>
			<div className={styles.inner}>
				<span className={styles.timer}>
					{`Еще ${calcNounDeclension(calcActionCountdown('07.08.2024'), 'день', 'дня', 'дней')} скидка`}
				</span>
				<p className={styles.title}>{`Скидка на ${formatCase('абв')}`}</p>
				<div className={styles.controls}>
					<Link
						className={styles.link}
						href={`${ROUTE.SEARCH}?`}
					>
						Подробнее
					</Link>
					<span className={styles.percent}>-5%</span>
				</div>
			</div>
		</article>
	)
}
