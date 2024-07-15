import Link from 'next/link'

import { FEATURES } from './features.data'

import styles from './Features.module.scss'

export const Features = () => {
	return (
		<div className={styles.container}>
			<ul className={styles.items}>
				{FEATURES.map((item) => (
					<li
						className={styles.item}
						key={item.title}
					>
						<Link
							className={styles.link}
							href={item.href}
						>
							<h2 className={styles.title}>{item.title}</h2>
							<p className={styles.text}>{item.description}</p>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
