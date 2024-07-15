'use client'

import { useQueryClient, useMutation } from '@tanstack/react-query'

import type { UserFormType } from '@/types/user.types'

import { useUserStore } from '@/store/user.store'
import { userService } from '@/services/user.service'

export function useUpdateProfile() {
	const queryClient = useQueryClient()

	const { setUser } = useUserStore()

	const { mutate, error, isPending, isSuccess, isError } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: UserFormType) => userService.update(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			setUser(data)
		}
	})

	return { mutate, error, isPending, isSuccess, isError }
}
