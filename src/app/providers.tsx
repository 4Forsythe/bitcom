'use client'

import React from 'react'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
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
		<>
			<QueryClientProvider client={clientQuery}>{children}</QueryClientProvider>
			<ProgressBar
				height='4px'
				color='#EF4444'
				options={{ showSpinner: false }}
				shallowRouting
			/>
		</>
	)
}
