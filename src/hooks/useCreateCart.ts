'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { CartItemFormType } from '@/types/cart.types'
import { cartService } from '@/services/cart.service'

export const useCreateCart = () => {
	const queryClient = useQueryClient()

	const { mutate, isPending, isSuccess, isError } = useMutation({
		mutationKey: ['create cart'],
		mutationFn: (data: CartItemFormType) => cartService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] })
		}
	})

	return { mutate, isPending, isSuccess, isError }
}
