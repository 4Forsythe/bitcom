import { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'
import { DeviceList } from '@/app/(wide)/devices/DeviceList'

import { deviceService } from '@/services/device.service'
import { ProductCharacteristicParamsType } from '@/types/product.types'

const getDevices = async (params?: ProductCharacteristicParamsType) => {
	return deviceService.getAll(params)
}

export const generateMetadata = async () => {
	const data = await deviceService.getAll({ take: 20 })

	if (!data) {
		return {
			title: 'Каталог устройств'
		}
	}

	return {
		title: 'Каталог устройств',
		description: `Компания «БитКом» предоставляет широкий выбор устройств для офиса и дома: ${data.items}. Всего ${data.count} шт. Наш каталог обновляется регулярно, и вы всегда сможете найти самые актуальные предложения и новинки. Кроме того, у нас всегда есть выгодные акции и скидки по разным позициям! Доставка по всей Самарской области, включая города Самара, Тольятти, Сызрань.`
	}
}

export const revalidate = 60

export default async function DevicesPage() {
	const data = await getDevices()

	return (
		<>
			<Heading
				title='Все устройства'
				control
			/>
			<DeviceList items={data} />
		</>
	)
}
