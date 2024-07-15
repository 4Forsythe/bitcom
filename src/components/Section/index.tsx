import { PropsWithChildren } from 'react'

import styles from './Section.module.scss'

export const Section = ({ children }: PropsWithChildren) => {
	return (
		<section className={styles.container}>
			<div className={styles.inner}>{children}</div>
		</section>
	)
}
