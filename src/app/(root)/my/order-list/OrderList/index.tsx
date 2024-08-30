import { EmptyBlock } from '@/components/EmptyBlock'
import styles from './OrderList.module.scss'

export const OrderList = () => {
	return (
		<div className={styles.container}>
			<EmptyBlock
				title='У вас пока нет заказов'
				description='Совершите покупку, чтобы здесь появилась новая информация о заказе'
			/>
		</div>
	)
}
