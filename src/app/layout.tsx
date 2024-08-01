import type { Metadata } from 'next'
import { PT_Sans } from 'next/font/google'

import { Providers } from './providers'
import { ModalProvider } from '@/contexts/ModalContext'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

import { SITE_NAME, SITE_DESCRIPTION } from '@/constants/seo.constants'

import '@/styles/main.scss'
import { BottomBanner } from '@/components/BottomBanner'

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
	description: SITE_DESCRIPTION,
	openGraph: {
		images: [
			{
				url: '/static/LOGO.png'
			}
		]
	},
	icons: {
		icon: ['/favicon.ico?v=4'],
		apple: ['/apple-touch-icon.png?v=4'],
		shortcut: ['/apple-touch-icon.png']
	}
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html
			lang='ru'
			className='scroll-smooth'
		>
			<body className={ptSans.className}>
				<Providers>
					<ModalProvider>
						<Header />
						<div className='container'>
							<main className='main'>{children}</main>
						</div>
						<Footer />
						<BottomBanner />
					</ModalProvider>
				</Providers>
			</body>
		</html>
	)
}
