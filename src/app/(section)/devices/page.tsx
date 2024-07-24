import { Heading } from '@/components/ui/Heading'
import { DeviceList } from '@/app/(section)/devices/DeviceList'

import { deviceService } from '@/services/device.service'

const getDevices = async () => {
	return deviceService.getAll()
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
