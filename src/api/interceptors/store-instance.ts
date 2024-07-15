import axios, { type CreateAxiosDefaults } from 'axios'

const isServerFetch = typeof window === 'undefined'

const options: CreateAxiosDefaults = {
	baseURL: isServerFetch ? process.env.STORE_API_URL : '/store',
	headers: {
		Authorization: `Basic ${Buffer.from('Web:').toString('base64')}`,
		'Content-Type': 'application/json'
	}
}

export const store = axios.create(options)
