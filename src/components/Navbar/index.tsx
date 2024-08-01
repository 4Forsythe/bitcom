import Link from 'next/link'

import clsx from 'clsx'

import { FEATURES } from './navbar.data'

import styles from './Navbar.module.scss'

export const Navbar = () => {
	return (
		<div className={styles.container}>
			<ul className={styles.items}>
				{FEATURES.map((item) => (
					<li
						className={clsx(styles.item, 'animate-slide')}
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
