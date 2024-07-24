'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useUserStore } from '@/store/user.store'
import { wishListService } from '@/services/wish-list.service'

export const useToggleWishList = () => {
	const queryClient = useQueryClient()

	const { getWishListCount } = useUserStore()

	const { mutate, isPending, isSuccess, isError } = useMutation({
		mutationKey: ['toggle wish-list'],
		mutationFn: (id: string) => wishListService.toggle(id),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['wish-list'] })
			getWishListCount()
		}
	})

	return { mutate, isPending, isSuccess, isError }
}
