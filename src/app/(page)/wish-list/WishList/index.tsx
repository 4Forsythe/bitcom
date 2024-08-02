'use client'

import { WishListItem } from '../WishListItem'
import { useWishList } from '@/hooks/useWishList'

import styles from './WishList.module.scss'
import { Skeleton } from '../WishListItem/Skeleton'
import { EmptyBlock } from '@/components/EmptyBlock'
import { useUserStore } from '@/store/user.store'

export const WishList = () => {
	const { user } = useUserStore()
	const { data, isLoading, isError } = useWishList()

	return (
		<div className={styles.container}>
			<div className={styles.list}>
				{isLoading
					? [...new Array(2)].map((item, index) => <Skeleton key={index} />)
					: data?.items.map((item) => (
							<WishListItem
								key={item.id}
								{...item}
							/>
						))}
			</div>
			{data?.items && data.items.length === 0 && (
				<EmptyBlock
					title='Похоже, ваш список желаемого пуст'
					description='Добавляйте сюда понравившиеся товары, а мы сделаем все возможное, чтобы вы смогли их потом найти!'
				/>
			)}
		</div>
	)
}
