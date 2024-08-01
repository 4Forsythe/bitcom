'use client'

import React from 'react'

import { Cookie, X } from 'lucide-react'

import styles from './BottomBanner.module.scss'
import clsx from 'clsx'

export const BottomBanner = () => {
	const [isHidden, setIsHidden] = React.useState(true)

	React.useEffect(() => {
		const banner = localStorage.getItem('bottom-banner') === 'off'

		if (!banner) setIsHidden(false)
	}, [])

	const onHide = () => {
		setIsHidden(true)
		localStorage.setItem('bottom-banner', 'off')
	}

	if (isHidden) return null

	return (
		<div className={clsx(styles.container, 'animate-opacity')}>
			<div className={styles.inner}>
				<div className={styles.cover}>
					<Cookie className={styles.image} />
				</div>
				<span className={styles.text}>
					Помогите нам улучшить качество сайта! Отправляйте свои предложения на
					почту <b>info@bitcom.ru</b>, и мы внимательно рассмотрим их. Это
					действительно поможет нам в развитии интернет-магазина!
					<br />— С уважением, команда разработчиков.
				</span>
				<button
					className={styles.control}
					onClick={onHide}
				>
					<X className={styles.icon} />
				</button>
			</div>
		</div>
	)
}
