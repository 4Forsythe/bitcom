'use client'

import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { useUserStore } from '@/store/user.store'
import { cartService } from '@/services/cart.service'

export function useCart() {
	const { setCart } = useUserStore()

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['cart'],
		queryFn: () => cartService.getAll()
	})

	React.useEffect(() => {
		if (isSuccess) setCart(data)
	}, [isSuccess])

	return { data, isLoading, isSuccess, isError }
}
