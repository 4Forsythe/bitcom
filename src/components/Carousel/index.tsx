'use client'

import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from 'swiper/react'
import styles from './Carousel.module.scss'
import { SLIDES } from './carousel.data'
import Image from 'next/image'

import { NavButton } from './NavButtons'

import SwiperCore from 'swiper'
import { Navigation, EffectFade, Autoplay } from 'swiper/modules'

import 'swiper/css'
import React from 'react'

export const Carousel = () => {
	SwiperCore.use([Autoplay])
	return (
		<>
			<Swiper
				className={styles.container}
				modules={[Navigation, Autoplay]}
				loop
				spaceBetween={14}
				slidesPerView={1}
				navigation={{
					nextEl: '.swiper-navigation-next',
					prevEl: '.swiper-navigation-prev'
				}}
				autoplay={{
					delay: 4000
				}}
			>
				{SLIDES.map((slide) => (
					<SwiperSlide key={slide.id}>
						<div className={styles.cover}>
							<Image
								className={styles.image}
								width={1000}
								height={500}
								src={slide.imageUrl}
								alt={slide.tag}
							/>
						</div>
					</SwiperSlide>
				))}
				<NavButton />
			</Swiper>
		</>
	)
}
