import { UserType } from './user.types'

export type PostType = {
	id: string

	title: string
	content: string
	imageUrl?: string
	views: number

	// user: UserType

	createdAt: string
	updatedAt: string
}

export type PostsType = {
	items: PostType[]
	count: number
}

export type PostParams = {
	id?: string
	sortBy?: string
	orderBy?: string
	take?: number
	skip?: number
}

export type PostFormType = {
	title: string
	content: string
}
