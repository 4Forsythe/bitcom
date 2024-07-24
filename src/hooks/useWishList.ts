'use client'

import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { useUserStore } from '@/store/user.store'
import { wishListService } from '@/services/wish-list.service'

export function useWishList() {
	const { setWishList } = useUserStore()

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['wish-list'],
		queryFn: () => wishListService.getAll()
	})

	React.useEffect(() => {
		if (isSuccess) setWishList(data)
	}, [isSuccess])

	return { data, isLoading, isSuccess, isError }
}
