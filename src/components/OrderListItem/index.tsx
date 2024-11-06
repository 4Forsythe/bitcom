'use client'

import clsx from 'clsx'

import { Info, ChevronDown } from 'lucide-react'

import { Badge } from '@/components/ui'
import { OrderProductCard } from './OrderProductCard'
import { OrderListItemSkeleton } from './skeleton'
import { ADDRESS } from '@/constants/contacts.constants'
import { calcNounDeclension } from '@/utils/calc-noun-declension'

import type { OrderType } from '@/types/order.types'

import styles from './order-list-item.module.scss'

export const OrderListItem: React.FC<OrderType> = ({
	total,
	items,
	status,
	gettingMethod,
	paymentMethod,
	createdAt
}) => {
	const count = items.reduce((sum, item) => sum + item.count, 0)

	return (
		<article className={clsx(styles.container, 'animate-slide')}>
			<div className={styles.head}>
				<h5 className={styles.title}>
					{`Заказ — ${new Date(createdAt).toLocaleDateString()}, ${new Date(createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`}
				</h5>
				<Badge
					className={styles.status}
					variant='contained'
					disabled
				>
					{status} <Info size={16} />
				</Badge>
			</div>
			<div className={styles.inner}>
				<div className={styles.details}>
					<div className={styles.method}>
						<h5 className={styles.tag}>Способ получения</h5>
						<Badge
							className={styles.badge}
						>{`${gettingMethod}, ${ADDRESS}`}</Badge>
					</div>
					<div className={styles.method}>
						<h5 className={styles.tag}>Оплата</h5>
						<Badge className={styles.badge}>{paymentMethod}</Badge>
					</div>
				</div>
				<div className={styles.items}>
					<p
						className={styles.count}
					>{`Всего ${calcNounDeclension(count, 'товар', 'товара', 'товаров')}`}</p>
					<ul className={styles.list}>
						{items.map((item) => (
							<li key={item.id}>
								<OrderProductCard {...item} />
							</li>
						))}
					</ul>
				</div>
				<div className={styles.footer}>
					<button className={styles.show}>
						<ChevronDown size={20} /> Детали заказа
					</button>
					<span className={styles.total}>{total} ₽</span>
				</div>
			</div>
		</article>
	)
}

export { OrderProductCard, OrderListItemSkeleton }
