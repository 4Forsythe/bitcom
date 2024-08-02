'use client'

import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { useUserStore } from '@/store/user.store'
import { cartService } from '@/services/cart.service'
import { useProfile } from './useProfile'

export function useCart() {
	const { data: profile, isLoading: isProfileLoading } = useProfile()
	const { setCart } = useUserStore()

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['cart'],
		queryFn: () => {
			if (profile) {
				return cartService.getAll()
			} else {
				return cartService.getCookie()
			}
		},
		enabled: !!profile && !isProfileLoading
	})

	React.useEffect(() => {
		if (isSuccess) setCart(data)
	}, [isSuccess])

	return { data, isLoading, isSuccess, isError }
}
