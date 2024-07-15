'use client'

import { useQuery } from '@tanstack/react-query'

import { PromoSlider } from '@/components/PromoSlider'
import { DiscountCard } from '@/components/DiscountCard'
import { Skeleton } from '@/components/DiscountCard/Skeleton'

import { calcActionCountdown } from '@/utils/calc-action-countdown'

import { DiscountsType } from '@/types/discount.types'
import { discountService } from '@/services/discount.service'

import styles from './Actions.module.scss'
import clsx from 'clsx'

const items = [
	{
		id: '000000001',
		dateBegin: '2024-05-01T00:00:00',
		dateEnd: '2024-06-30T00:00:00',
		percent: 15,
		target: 'Ноутбук',
		targetId: '000000005',
		type: 'subcategory'
	},
	{
		id: '000000001',
		dateBegin: '2024-05-01T00:00:00',
		dateEnd: '2024-06-30T00:00:00',
		percent: 15,
		target: 'Ноутбук',
		targetId: '000000005',
		type: 'subcategory'
	},
	{
		id: '000000001',
		dateBegin: '2024-05-01T00:00:00',
		dateEnd: '2024-06-30T00:00:00',
		percent: 15,
		target: 'Ноутбук',
		targetId: '000000005',
		type: 'subcategory'
	},
	{
		id: '000000001',
		dateBegin: '2024-05-01T00:00:00',
		dateEnd: '2024-06-30T00:00:00',
		percent: 15,
		target: 'Ноутбук',
		targetId: '000000005',
		type: 'subcategory'
	},
	{
		id: '000000001',
		dateBegin: '2024-05-01T00:00:00',
		dateEnd: '2024-06-30T00:00:00',
		percent: 15,
		target: 'Ноутбук',
		targetId: '000000005',
		type: 'subcategory'
	},
	{
		id: '000000001',
		dateBegin: '2024-05-01T00:00:00',
		dateEnd: '2024-06-30T00:00:00',
		percent: 15,
		target: 'Ноутбук',
		targetId: '000000005',
		type: 'subcategory'
	},
	{
		id: '000000001',
		dateBegin: '2024-05-01T00:00:00',
		dateEnd: '2024-06-30T00:00:00',
		percent: 15,
		target: 'Ноутбук',
		targetId: '000000005',
		type: 'subcategory'
	},
	{
		id: '000000001',
		dateBegin: '2024-05-01T00:00:00',
		dateEnd: '2024-06-30T00:00:00',
		percent: 15,
		target: 'Ноутбук',
		targetId: '000000005',
		type: 'subcategory'
	}
]

interface ActionsProps {
	initialActions?: DiscountsType
}

export const Actions = ({ initialActions }: ActionsProps) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['actions'],
		queryFn: () => discountService.getAll(),
		initialData: initialActions
	})

	const actions = data?.items.filter(
		(item) => calcActionCountdown(item.dateEnd) > 0
	)

	if (isLoading) {
		return (
			<div className={styles.wrap}>
				<div className={styles.container}>
					{[...new Array(4)].map((item, index) => (
						<Skeleton key={index} />
					))}
				</div>
			</div>
		)
	}

	if (!actions || error) {
		return null
	}

	return (
		<div className={clsx(styles.wrap, 'animate-opacity')}>
			{actions && actions.length >= 4 ? (
				<PromoSlider
					loop
					slidesPerView={4}
					slides={actions.map((item) => (
						<DiscountCard
							{...item}
							key={item.id}
						/>
					))}
				/>
			) : (
				<div className={styles.container}>
					{actions?.map((item) => (
						<DiscountCard
							{...item}
							key={item.id}
						/>
					))}
				</div>
			)}
		</div>
	)
}
