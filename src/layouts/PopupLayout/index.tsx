import { ArrowLeft } from 'lucide-react'

import { useModal } from '@/hooks/useModal'

import styles from './PopupLayout.module.scss'

export function PopupLayout({ children }: React.PropsWithChildren<unknown>) {
	const { onClose } = useModal()

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<button
					className={styles.control}
					onClick={onClose}
				>
					<ArrowLeft className={styles.icon} />
				</button>
				<span className={styles.title}>Фильтры</span>
			</div>
			<div className={styles.inner}>{children}</div>
		</div>
	)
}
