import styles from './ErrorMessage.module.scss'

export const ErrorMessage = ({ children }: React.PropsWithChildren) => {
	return (
		<div className={styles.container}>
			<span className={styles.text}>{children}</span>
		</div>
	)
}
