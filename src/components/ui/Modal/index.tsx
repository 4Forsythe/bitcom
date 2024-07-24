'use client'

import { useModal } from '@/hooks/useModal'

import styles from './Modal.module.scss'

interface ModalProps {
	children: React.ReactNode
}

export const Modal = ({ children }: ModalProps) => {
	const { onClose } = useModal()

	return (
		<div className={styles.container}>
			<div className={styles.dialog}>{children}</div>
			<div
				className={styles.overlay}
				onClick={onClose}
			/>
		</div>
	)
}
