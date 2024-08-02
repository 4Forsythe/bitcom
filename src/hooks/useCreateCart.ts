'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useUserStore } from '@/store/user.store'
import { cartService } from '@/services/cart.service'
import type { CartItemFormType } from '@/types/cart.types'
import { useProfile } from './useProfile'

export const useCreateCart = () => {
	const queryClient = useQueryClient()

	const { getCartCount } = useUserStore()

	const { mutate, isPending, isSuccess, isError } = useMutation({
		mutationKey: ['create cart'],
		mutationFn: (data: CartItemFormType) => {
			return cartService.create(data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] })
			getCartCount()
		}
	})

	return { mutate, isPending, isSuccess, isError }
}
