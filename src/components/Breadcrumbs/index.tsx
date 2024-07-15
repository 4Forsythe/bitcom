'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './Breadcrumbs.module.scss'

export const Breadcrumbs = () => {
	const pathname = usePathname()
	const items = pathname.split('/').filter((x) => x)

	return (
		<div className={styles.wrap}>
			<ul className={styles.list}>
				<li className={styles.item}>
					<Link
						className={styles.link}
						href='/'
					>
						Главная
					</Link>
				</li>
				{items.map((item, index) => (
					<li
						className={styles.item}
						key={index}
					>
						{index === items.length - 1 ? (
							<span>{item}</span>
						) : (
							<Link
								className={styles.link}
								href={`/${item}`}
								key={index}
							>
								{item}
							</Link>
						)}
					</li>
				))}
			</ul>
		</div>
	)
}
