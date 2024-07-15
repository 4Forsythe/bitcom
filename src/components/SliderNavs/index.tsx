'use client'

import clsx from 'clsx'
import { useSwiper } from 'swiper/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import styles from './SliderNavs.module.scss'

export const SliderNavs = () => {
	const swiper = useSwiper()

	return (
		<>
			<button
				className={clsx(styles.control, styles.prev)}
				onClick={() => swiper.slidePrev()}
			>
				<ChevronLeft className={styles.icon} />
			</button>
			<button
				className={clsx(styles.control, styles.next)}
				onClick={() => swiper.slideNext()}
			>
				<ChevronRight className={styles.icon} />
			</button>
		</>
	)
}
