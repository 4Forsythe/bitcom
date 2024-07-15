'use client'

import { useQueryClient, useMutation } from '@tanstack/react-query'

import { cartService } from '@/services/cart.service'

export function useDeleteCart() {
	const queryClient = useQueryClient()

	const { mutate, isPending, isSuccess } = useMutation({
		mutationKey: ['delete cart'],
		mutationFn: (id: string) => cartService.remove(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] })
		}
	})

	return { mutate, isPending, isSuccess }
}
