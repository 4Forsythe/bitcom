import { api } from '@/api/interceptors/api-instance'

import type { UserType } from '@/types/user.types'
import type {
	AuthType,
	AuthFormType,
	RegisterFormType
} from '@/types/auth.types'

import { setAccessToken, removeAccessToken } from './auth-token.service'

class AuthService {
	private endpoint = '/auth'

	async login(data: AuthFormType) {
		const response = await api.post<AuthType>(`${this.endpoint}/login`, data)
		const token = response.data.accessToken

		if (token) setAccessToken(token)

		return response
	}

	async register(data: AuthFormType) {
		const response = await api.post<AuthType>(`${this.endpoint}/register`, data)
		const token = response.data.accessToken

		if (token) setAccessToken(token)

		return response
	}

	async sendCode(data: { email: string }) {
		const response = await api.post<boolean>(`${this.endpoint}/send-code`, data)

		return response
	}

	async verify(data: { email: string; code: number }) {
		const response = await api.post<UserType>(`${this.endpoint}/verify`, data)

		return response
	}

	async getTokens() {
		const response = await api.post<AuthType>(`${this.endpoint}/login/extend`)
		const token = response.data.accessToken

		if (token) setAccessToken(token)

		return response
	}

	async logout() {
		const response = await api.post<boolean>(`${this.endpoint}/logout`)

		if (response.data) removeAccessToken()

		return response
	}
}

export const authService = new AuthService()
