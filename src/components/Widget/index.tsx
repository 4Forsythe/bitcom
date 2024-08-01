import styles from './Widget.module.scss'

interface WidgetProps {
	title: string
	children: string | React.ReactNode
}

export const Widget = ({ title, children }: WidgetProps) => {
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.inner}>{children}</div>
		</div>
	)
}
