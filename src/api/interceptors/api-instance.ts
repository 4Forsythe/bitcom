import axios, { type CreateAxiosDefaults } from 'axios'

import {
	getAccessToken,
	removeAccessToken
} from '@/services/auth-token.service'
import { errorCatch } from '../error-catch'
import { authService } from '@/services/auth.service'

const isServerFetch = typeof window === 'undefined'

const options: CreateAxiosDefaults = {
	baseURL: isServerFetch ? process.env.API_BASE_URL : '/api',
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

export const api = axios.create(options)
export const apiWithHeaders = axios.create(options)

apiWithHeaders.interceptors.request.use((config) => {
	const accessToken = getAccessToken()

	// if (!accessToken) {
	// 	return Promise.reject(new Error('unauthorized or token expired'))
	// }

	console.log('token', accessToken)

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

apiWithHeaders.interceptors.response.use(
	(config) => config,
	async (error) => {
		const req = error.config

		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'JWT is expired' ||
				errorCatch(error) === 'JWT must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			req._isRetry = true
			try {
				await authService.getTokens()
				return apiWithHeaders.request(req)
			} catch (error) {
				errorCatch(error) === 'JWT is expired' && removeAccessToken()
			}
		}

		throw error
	}
)
