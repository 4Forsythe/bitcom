'use client'

import { useQueryClient, useMutation } from '@tanstack/react-query'

import { useUserStore } from '@/store/user.store'
import { cartService } from '@/services/cart.service'

export function useDeleteCart() {
	const queryClient = useQueryClient()

	const { getCartCount } = useUserStore()

	const { mutate, isPending, isSuccess } = useMutation({
		mutationKey: ['delete cart'],
		mutationFn: (id: string) => cartService.remove(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] })
			getCartCount()
		}
	})

	return { mutate, isPending, isSuccess }
}
