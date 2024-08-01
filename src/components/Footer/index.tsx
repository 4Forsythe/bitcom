import Link from 'next/link'

import { INFOS, SERVICES, CONTACTS } from './menu.data'

import styles from './Footer.module.scss'
import Image from 'next/image'
import clsx from 'clsx'

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
							<li className={styles.marketplaces}>
								<Link
									className={styles.avito}
									href='https://www.avito.ru/brands/bitcom63'
									target='_blank'
								>
									<Image
										className={styles.image}
										width={100}
										height={100}
										src='/icons/Avito.svg'
										alt='Avito'
										priority
									/>
								</Link>
								<Link
									className={styles.market}
									href='https://market.yandex.ru/business--resurstekhno-elektronika/1148896'
									target='_blank'
								>
									<Image
										className={styles.image}
										width={100}
										height={100}
										src='/icons/Market.svg'
										alt='Yandex.Market'
										priority
									/>
								</Link>
							</li>
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
