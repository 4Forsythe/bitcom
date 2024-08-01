import Link from 'next/link'
import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'
import { Section } from '@/components/Section'

import styles from '@/components/Section/Section.module.scss'

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
							href='tel:89277839022'
						>
							8-927-783-90-22
						</Link>
					</li>
					<li>
						<Link
							className={styles.link}
							href='tel:88482411212'
						>
							8-8482-41-1212
						</Link>
					</li>
					<li>
						<Link
							className={styles.link}
							href='mailto:info@bitcom63.ru'
						>
							info@bitcom63.ru
						</Link>
					</li>
					<li>
						<Link
							className={styles.link}
							href='mailto:bitcom63@yandex.ru'
						>
							bitcom63@yandex.ru
						</Link>
					</li>
				</ul>
			</Section>
		</section>
	)
}
