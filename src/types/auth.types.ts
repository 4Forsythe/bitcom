import type { UserType } from './user.types'

export type AuthType = {
	user: UserType
	accessToken: string
}

export type AuthFormType = {
	phone: string
	code?: number
	password?: string
}

export type LoginFormType = {
	phone: string
	code?: number
	password?: string
}

export type RegisterFormType = {
	phone: string
}
