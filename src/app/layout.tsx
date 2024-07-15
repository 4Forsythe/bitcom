import type { Metadata } from 'next'
import { PT_Sans } from 'next/font/google'

import { Providers } from './providers'
import { ModalProvider } from '@/contexts/ModalContext'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

import { SITE_NAME } from '@/constants/seo.constants'

import '@/styles/main.scss'

const ptSans = PT_Sans({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '700'],
	style: ['normal'],
	variable: '--font-pt-sans'
})

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: 'The simple and stronger one for planning your activities!'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={ptSans.className}>
				<Providers>
					<ModalProvider>
						<Header />
						<div className='container'>
							<main className='main'>{children}</main>
						</div>
						<Footer />
					</ModalProvider>
				</Providers>
			</body>
		</html>
	)
}
