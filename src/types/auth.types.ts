import type { UserType } from './user.types'

export type AuthType = {
	user: UserType
	accessToken: string
}

export type AuthFormType = {
	name?: string
	email: string
	code?: number
	password?: string
}

export type LoginFormType = {
	email: string
	password: string
}

export type RegisterFormType = {
	name?: string
	code: number
	email: string
	password: string
}
