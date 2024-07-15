'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { AuthFormType } from '@/types/auth.types'
import { authService } from '@/services/auth.service'
import { useUserStore } from '@/store/user.store'

export function useLogin(onClose: () => void) {
	const queryClient = useQueryClient()

	const { setUser } = useUserStore()

	const { mutate, isPending, isError, error } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: AuthFormType) => authService.login(data),
		retry: 0,
		onSuccess: (response) => {
			onClose()
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			setUser(response.data.user)
		}
	})

	return { mutate, isPending, isError, error }
}
