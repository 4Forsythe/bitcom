import axios, { type CreateAxiosDefaults } from 'axios'

import { getAccessToken } from '@/services/auth-token.service'

const isServerFetch = typeof window === 'undefined'

const options: CreateAxiosDefaults = {
	baseURL: isServerFetch ? process.env.SERVER_API_URL : '/api',
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

export const api = axios.create(options)
export const apiWithHeaders = axios.create(options)

apiWithHeaders.interceptors.request.use((config) => {
	const accessToken = getAccessToken()

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

// apiWithHeaders.interceptors.response.use(
// 	(config) => config,
// 	async (error) => {
// 		const req = error.config

// 		if (
// 			(error?.response?.status === 401 ||
// 				catcher(error) === 'jwt expired' ||
// 				catcher(error) === 'jwt must be provided') &&
// 			error.config &&
// 			!error.config._isRetry
// 		) {
// 			req._isRetry = true

// 			try {
// 				await authService.getTokens()
// 				return apiWithHeaders.request(req)
// 			} catch (error) {
// 				catcher(error) === 'jwt expired' && removeAccessToken()
// 			}
// 		}

// 		throw error
// 	}
// )
