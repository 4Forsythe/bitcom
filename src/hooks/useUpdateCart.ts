import { useMutation, useQueryClient } from '@tanstack/react-query'

import { CartItemFormType } from '@/types/cart.types'
import { cartService } from '@/services/cart.service'

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
