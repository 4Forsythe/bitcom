import Link from 'next/link'

import { ROUTE } from '@/config/routes.config'

import type { ProductCharacteristicsType } from '@/types/product.types'

import styles from './DeviceList.module.scss'

export const DeviceList = ({
	items
}: {
	items: ProductCharacteristicsType
}) => {
	const onChunkArray = (
		array: ProductCharacteristicsType,
		itemsPerGroup: number
	) => {
		let items = []

		for (let i = 0; i < array.items.length; i += itemsPerGroup) {
			items.push(array.items.slice(i, i + itemsPerGroup))
		}

		return items
	}

	const devices = onChunkArray(items, 10)

	return (
		<div className={styles.wrap}>
			<div className={styles.container}>
				{devices.map((group, index) => (
					<ul
						className={styles.group}
						key={index}
					>
						{group.map((item) => (
							<li
								className={styles.item}
								key={item.id}
							>
								<Link
									className={styles.link}
									href={`${ROUTE.SEARCH}?device=${item.id}`}
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				))}
			</div>
		</div>
	)
}
