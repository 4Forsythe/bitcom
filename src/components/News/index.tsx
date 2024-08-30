import styles from './News.module.scss'
import { SOCIALS } from './socials.data'
import Link from 'next/link'
import Image from 'next/image'
import { BANNERS } from '../Banner/banners.data'
import { Badge } from '../ui/Badge'
import { Widget } from '../Widget'
import { Banner } from '../Banner'
import { Carousel } from '../Carousel'

export const News = () => {
	return (
		<section className={styles.container}>
			<div className={styles.inner}>
				<Carousel />
				<div className={styles.column}>
					<Widget title='Покупайте у нас'>
						<div className={styles.socials}>
							<Badge
								variant='contained'
								href='https://www.avito.ru/brands/bitcom63'
							>
								Авито
							</Badge>
							<Badge
								variant='contained'
								href='https://market.yandex.ru/business--resurstekhno-elektronika/1148896'
							>
								Яндекс
							</Badge>
						</div>
					</Widget>
					<Widget title='Следите за новостями'>
						<div className={styles.socials}>
							{SOCIALS.map((item) => (
								<Link
									className={styles.item}
									key={item.href}
									href={item.href}
									target='_blank'
								>
									<Image
										className={styles.icon}
										width={64}
										height={64}
										src={item.imageUrl}
										alt={item.tag}
										priority
									/>
								</Link>
							))}
						</div>
					</Widget>
				</div>
			</div>
		</section>
	)
}
