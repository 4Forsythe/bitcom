import Link from 'next/link'

import { calcActionCountdown } from '@/utils/calc-action-countdown'
import { formatCase } from '@/utils/format-case'
import { calcNounDeclension } from '@/utils/calc-noun-declension'

import { ROUTE } from '@/config/routes.config'

import type { DiscountType } from '@/types/discount.types'

import styles from './DiscountCard.module.scss'

export const DiscountCard = ({
	id,
	dateBegin,
	dateEnd,
	percent,
	target,
	targetId,
	type
}: DiscountType) => {
	if (!percent) {
		return <span>Загрузка...</span>
	}

	return (
		<article className={styles.wrap}>
			<div className={styles.container}>
				<span className={styles.timer}>
					{`Еще ${calcNounDeclension(calcActionCountdown(dateEnd), 'день', 'дня', 'дней')}`}
				</span>
				<p className={styles.super}>{`Скидка на ${formatCase(target)}`}</p>
				<div className={styles.controls}>
					<Link
						className={styles.link}
						href={`${ROUTE.SEARCH}?${type}=${targetId}`}
					>
						Смотреть
					</Link>
					<span className={styles.percent}>-{percent}%</span>
				</div>
			</div>
		</article>
	)
}
