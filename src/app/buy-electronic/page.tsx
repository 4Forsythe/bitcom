import Link from 'next/link'

import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/Section'

import styles from '@/components/Section/Section.module.scss'

export default function BuyElectronicPage() {
	return (
		<>
			<Heading title='Покупка электроники' />
			<Section>
				<p>
					Компьютерная техника очень быстро стареет, начинает все медленнее
					работать и не успевает за все более «тяжелым» софтом. После чего
					просто становится электронным ломом. Но это не означает, что ее надо
					просто выкинуть – можно продать платы с радиодеталями и комплектующие,
					получив реальные деньги.
				</p>
				<p>
					Обратившись к нам, вы сможете выгодно продать материнскую плату от ПК
					или ноутбука.
				</p>
				<Link
					className={styles.link}
					href='/assets/electronic-pricelist.pdf'
					target='blank'
				>
					Ознакомиться с прайс-листом
				</Link>
			</Section>
		</>
	)
}
