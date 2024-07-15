export type DeviceType = {
	id: string
	name: string
}

export type DevicesType = {
	items: DeviceType[]
	count: number
}

export type DeviceParams = {
	take?: number
	skip?: number
}
