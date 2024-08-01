'use client'

import { useQuery } from '@tanstack/react-query'

import { productService } from '@/services/product.service'
import type { ProductParamsType } from '@/types/product.types'
import React from 'react'
import debounce from 'lodash.debounce'

interface UseDebounceProps {
	value: string
	delay: number
}

export function useDebounce({ value, delay }: UseDebounceProps) {
	const [query, setQuery] = React.useState(value)

	const onDebounce = React.useCallback(
		debounce((value: string) => {
			setQuery(value)
		}, delay),
		[delay]
	)

	React.useEffect(() => {
		if (value.trim()) {
			onDebounce(value)
		}
	}, [value])

	return { query }
}
