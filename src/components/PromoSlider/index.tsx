'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import { SliderNavs } from '@/components/SliderNavs'

import styles from './PromoSlider.module.scss'

import 'swiper/css'

interface SliderProps {
	slides: React.JSX.Element[]
	loop?: boolean
	slidesPerView?: number
}

export const PromoSlider = ({ slides, loop, slidesPerView }: SliderProps) => {
	return (
		<div className={styles.wrap}>
			<div className={styles.container}>
				<Swiper
					className={styles.slider}
					loop={loop}
					allowTouchMove
					slidesPerView={slidesPerView || 'auto'}
					modules={[Navigation]}
				>
					{slides.map((slide, index) => (
						<SwiperSlide
							className={styles.slide}
							key={index}
						>
							{slide}
						</SwiperSlide>
					))}
					<SliderNavs />
				</Swiper>
			</div>
		</div>
	)
}
