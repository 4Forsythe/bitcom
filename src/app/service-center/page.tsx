import type { Metadata } from 'next'

import { ServiceCenter } from '@/app/service-center/ServiceCenter'

export const metadata: Metadata = {
	title: 'Сервисный центер',
	description:
		'Компания «БитКом» занимается ремонтом промышленного оборудования и электронной техники. Мы осуществляем ремонт, профилактику и обслуживание промышленной электроники, производственного оборудования, автоматики, строительной и офисной технки, компьютеров и ноутбуков любой сложности, а также мониторов и телевизоров в городе Тольятти.'
}

export default function ServiceCenterPage() {
	return <ServiceCenter />
}
