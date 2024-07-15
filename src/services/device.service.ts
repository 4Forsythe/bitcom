import { api } from '@/api/interceptors/api-instance'

import type {
	DeviceType,
	DevicesType,
	DeviceParams
} from '@/types/device.types'

class DeviceService {
	private endpoint = '/device'

	async getAll(params?: DeviceParams): Promise<DevicesType> {
		const response = await api.get(this.endpoint, { params })
		return response.data
	}

	async getOne(id: string): Promise<DeviceType> {
		const response = await api.get(`${this.endpoint}/${id}`)
		return response.data
	}
}

export const deviceService = new DeviceService()
