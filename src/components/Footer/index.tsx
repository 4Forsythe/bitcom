import Link from 'next/link'

import { INFOS, SERVICES, CONTACTS } from './menu.data'

import styles from './Footer.module.scss'

export const Footer = () => {
	return (
		<footer className={styles.container}>
			<div className={styles.inner}>
				<nav className={styles.navbar}>
					<div className={styles.menu}>
						<h6 className={styles.title}>Информация</h6>
						<ul className={styles.list}>
							{INFOS.map((item) => (
								<li>
									<Link
										className={styles.item}
										href={item.href}
										target='_blank'
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className={styles.menu}>
						<h6 className={styles.title}>Услуги</h6>
						<ul className={styles.list}>
							{SERVICES.map((item) => (
								<li>
									<Link
										className={styles.item}
										href={item.href}
										target='_blank'
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className={styles.menu}>
						<h6 className={styles.title}>Контакты</h6>
						<ul className={styles.list}>
							{CONTACTS.map((item) => (
								<li>
									<Link
										className={styles.item}
										href={item.href}
										target='_blank'
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</nav>
				<div className={styles.copyright}>
					<span className={styles.text}>
						{new Date().getFullYear()} © ООО "БИТКОМ" — Все права защищены
					</span>
				</div>
			</div>
		</footer>
	)
}
