import Image from 'next/image'

import styles from './PaymentItem.module.scss'

interface PaymentItemProps {
	type: string
	imageUrl: string
}

export const PaymentItem = ({ type, imageUrl }: PaymentItemProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.cover}>
				<Image
					className={styles.image}
					width={70}
					height={35}
					src={imageUrl}
					alt={type}
					priority
				/>
			</div>
		</div>
	)
}
