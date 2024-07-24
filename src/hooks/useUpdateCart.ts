import { useMutation, useQueryClient } from '@tanstack/react-query'

import { cartService } from '@/services/cart.service'
import type { CartItemFormType } from '@/types/cart.types'

export const useUpdateCart = () => {
	const queryClient = useQueryClient()

	const { mutate, isPending, isSuccess, isError } = useMutation({
		mutationKey: ['update cart'],
		mutationFn: ({ id, data }: { id: string; data: CartItemFormType }) =>
			cartService.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] })
		}
	})

	return { mutate, isPending, isSuccess, isError }
}
