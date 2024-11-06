import styles from './layout.module.scss'

export default function PageLayout({
	children
}: React.PropsWithChildren<unknown>) {
	return (
		<div className={styles.container}>
			<section className={styles.inner}>{children}</section>
		</div>
	)
}
