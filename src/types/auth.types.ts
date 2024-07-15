import type { UserType } from './user.types'

export type AuthType = {
	user: UserType
	accessToken: string
}

export type AuthFormType = {
	phone: string
	name?: string
	code?: number
}

export type LoginFormType = {
	phone: string
	code: number
}

export type RegisterFormType = {
	phone: string
	name?: string
}
