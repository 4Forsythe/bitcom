import Link from 'next/link'
import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/Section'

import styles from '@/components/Section/Section.module.scss'
import {
	EMAIL,
	PHONE,
	SECOND_EMAIL,
	SECOND_PHONE
} from '@/constants/contacts.constants'

export const metadata: Metadata = {
	title: 'Обновление парка компьютерной техники для организаций',
	description:
		'Компания «БитКом» предлагает организациям недорогое и эффективное решение по обновлению парка компьютерной и офисной техники по доступным ценам в городе Тольятти. Для организаций предлагается замена устаревших рабочих компьютеров на оборудование со следующими параметрами: новый корпус системного блока, процессор i5 3450  3470, ОЗУ 8Gb, SSD 250Gb...'
}

export default function UpgradingPage() {
	return (
		<section>
			<Heading title='Обновление парка компьютерной техники для организаций' />
			<Section>
				<p>
					Компания БИТКОМ предлагает организациям недорогое обновление парка
					компьютерной техники
				</p>
				<p>
					Для организаций предлагается замена устаревших рабочих компьютеров на
					оборудование со следующими параметрами:
				</p>
				<ul className={styles.list}>
					<li>Новый корпус системного блока</li>
					<li>Процессор i5 3450 \ 3470</li>
					<li>Оперативная память 8 Гб</li>
					<li>SSD 250 Гб</li>
				</ul>
				<p>
					Также БИТКОМ предлагает следующие условия при замене компьютерной
					техники:
				</p>
				<ul className={styles.list}>
					<li>Гарантия: 12 мес.</li>
					<li>Оформление: Заключение договора</li>
					<li>Предлагаемая цена: 20 000₽</li>
				</ul>
				<p>
					Для уточнения деталей данного предложения – обращаться в компанию
					БИТКОМ:
				</p>
				<ul className={styles.bar}>
					<li>
						<Link
							className={styles.link}
							href={`tel:${SECOND_PHONE}`}
						>
							{SECOND_PHONE}
						</Link>
					</li>
					<li>
						<Link
							className={styles.link}
							href={`tel:${PHONE}`}
						>
							{PHONE}
						</Link>
					</li>
					<li>
						<Link
							className={styles.link}
							href={`mailto:${EMAIL}`}
						>
							{EMAIL}
						</Link>
					</li>
					<li>
						<Link
							className={styles.link}
							href={`mailto:${SECOND_EMAIL}`}
						>
							{SECOND_EMAIL}
						</Link>
					</li>
				</ul>
			</Section>
		</section>
	)
}
