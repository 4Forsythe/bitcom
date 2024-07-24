'use client'

import React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const Providers = ({ children }: React.PropsWithChildren) => {
	const [clientQuery] = React.useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false
				}
			}
		})
	)

	return (
		<QueryClientProvider client={clientQuery}>{children}</QueryClientProvider>
	)
}
