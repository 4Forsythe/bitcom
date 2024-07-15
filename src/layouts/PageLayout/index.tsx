import styles from './PageLayout.module.scss'

export function PageLayout({ children }: React.PropsWithChildren<unknown>) {
	return (
		<div className={styles.container}>
			<section className={styles.page}>{children}</section>
		</div>
	)
}
