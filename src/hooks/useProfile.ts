'use client'

import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { useUserStore } from '@/store/user.store'
import { userService } from '@/services/user.service'

export function useProfile() {
	const { setUser } = useUserStore()

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		retry: 0
	})

	React.useEffect(() => {
		if (isSuccess) setUser(data)
	}, [isSuccess])

	return { data, isLoading, isSuccess, isError }
}
