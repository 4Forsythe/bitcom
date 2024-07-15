import Link from 'next/link'

import { ROUTE } from '@/config/routes.config'

import type { DeviceType, DevicesType } from '@/types/device.types'

import styles from './DeviceList.module.scss'

interface DeviceListProps {
	devices: DevicesType
}

export const DeviceList = ({ devices }: DeviceListProps) => {
	const onChunkArray = (array: DevicesType, itemsPerGroup: number) => {
		let items = []

		for (let i = 0; i < array.items.length; i += itemsPerGroup) {
			items.push(array.items.slice(i, i + itemsPerGroup))
		}

		return items
	}

	const deviceGroups = onChunkArray(devices, 10)

	return (
		<div className={styles.wrap}>
			<div className={styles.container}>
				{deviceGroups.map((group, index) => (
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
