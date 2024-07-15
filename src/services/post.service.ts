import { api, apiWithHeaders } from '@/api/interceptors/api-instance'

import type {
	PostFormType,
	PostParams,
	PostType,
	PostsType
} from '@/types/post.types'

class PostService {
	private endpoint = '/post'

	async create(data: PostFormType) {
		const response = await apiWithHeaders.post<PostType>(
			`${this.endpoint}`,
			data
		)

		return response.data
	}

	async getAll(params?: PostParams) {
		const response = await api.get<PostsType>(`${this.endpoint}`, { params })
		return response.data
	}

	async getByAuthor(token?: string, params?: PostParams) {
		if (token) {
			const headers = { Authorization: `Bearer ${token}` }

			const response = await api.get<PostsType>(`${this.endpoint}/me`, {
				headers,
				params
			})
			return response.data
		} else {
			const response = await apiWithHeaders.get<PostsType>(
				`${this.endpoint}/me`,
				{ params }
			)
			return response.data
		}
	}

	async getOne(id: string) {
		const response = await api.get<PostType>(`${this.endpoint}/${id}`)
		return response.data
	}

	async remove(id: string) {
		const response = await apiWithHeaders.delete<PostType>(
			`${this.endpoint}/${id}`
		)

		return response.data
	}
}

export const postService = new PostService()
