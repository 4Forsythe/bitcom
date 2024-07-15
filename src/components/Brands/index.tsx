'use server'

import Image from 'next/image'

import { PromoSlider } from '@/components/PromoSlider'

import styles from './Brands.module.scss'

const brands = [
	'/images/brands/panasonic.jpg',
	'/images/brands/canon.jpg',
	'/images/brands/sony.jpg',
	'/images/brands/nikon.jpg',
	'/images/brands/bosch.jpg',
	'/images/brands/pioneer.jpg',
	'/images/brands/electrolux.jpg',
	'/images/brands/electrolux.jpg',
	'/images/brands/electrolux.jpg',
	'/images/brands/electrolux.jpg'
]

export const Brands = () => {
	return (
		<div className={styles.wrap}>
			<PromoSlider
				loop
				slidesPerView={8}
				slides={brands.map((src, index) => (
					<div
						className={styles.card}
						key={index}
					>
						<Image
							className={styles.image}
							width={120}
							height={36}
							src={src}
							alt='Brand'
							priority
						/>
					</div>
				))}
			/>
		</div>
	)
}
