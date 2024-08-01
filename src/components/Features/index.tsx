import styles from './Features.module.scss'

interface FeaturesProps {
	title: string
	items: React.ReactNode
}

export const Features = ({ title, items }: FeaturesProps) => {
	return (
		<section className={styles.container}>
			<h1 className={styles.title}>{title}</h1>
			<div className={styles.inner}>{items}</div>
		</section>
	)
}
