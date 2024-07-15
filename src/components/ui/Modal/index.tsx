'use client'

import { useModal } from '@/hooks/useModal'

import styles from './Modal.module.scss'

interface IModal {
	content: React.ReactNode
}

export const Modal = ({ content }: IModal) => {
	const { onClose } = useModal()

	return (
		<div className={styles.container}>
			<div className={styles.dialog}>{content}</div>
			<div
				className={styles.overlay}
				onClick={onClose}
			/>
		</div>
	)
}
