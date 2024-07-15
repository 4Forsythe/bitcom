import Link from 'next/link'
import Image from 'next/image'

import { ROUTE } from '@/config/routes.config'

import styles from './Company.module.scss'

export const Company = () => {
	return (
		<div className={styles.container}>
			<div className={styles.logotype}>
				<Image
					className={styles.image}
					width={220}
					height={220}
					src='/images/about.png'
					alt='Logo'
					priority
				/>
			</div>
			<div className={styles.description}>
				<div className={styles.head}>
					<h3 className={styles.title}>О компании</h3>
					<Link
						className={styles.link}
						href={ROUTE.ABOUT}
					>
						Больше
					</Link>
				</div>
				<p className={styles.paragraph}>
					Компания «БИТ-КОМ» – специализируется на реализации восстановленного
					компьютерного оборудования, комплектующих, офисной и бытовой
					оргтехники.
				</p>
				<p className={styles.paragraph}>
					Техника б/у в компании «БИТ-КОМ» восстанавливается опытными мастерами,
					тестируется на работоспособность сотрудниками компании и прекрасно
					соответствует задачам для офиса и дома!
				</p>
				<p className={styles.paragraph}>
					Если же вам требуются компьютеры для более широкого и
					ресурсозатратного круга задач – компания «БИТ-КОМ» готова предложить
					свои услуги по сборке ПК на заказ под ваши требования (как из новых,
					так и из б/у компонентов).
				</p>
				<p className={styles.paragraph}>
					Компания «БИТ-КОМ» осуществляет сборку компьютеров по комплектующим на
					заказ: покупка комплектующих осуществляется в магазинах «ДНС»,
					«Ситилинк», «Регард», «Онлайн Трейд», гарантия распространяется на
					сборку, гарантийные обязательства за комплектующие несет продающий
					магазин.
				</p>
			</div>
		</div>
	)
}
