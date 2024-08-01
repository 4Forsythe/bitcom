import { NextResponse, type NextRequest } from 'next/server'

import { TokenEnum } from './services/auth-token.service'

export async function middleware(request: NextRequest) {
	const { url, cookies } = request

	const api = String(process.env.API_BASE_URL)

	const accessToken = cookies.get(TokenEnum.ACCESS_TOKEN)?.value
	const refreshToken = cookies.get(TokenEnum.REFRESH_TOKEN)?.value

	const isApiRoute = url.includes('/api')

	if (isApiRoute) {
		return NextResponse.next()
	}

	const isProtectedRoute = ['/my', '/cart'].some((path) => url.includes(path))
	const isPrivateRoute = ['/write', '/my/articles'].some((path) =>
		url.includes(path)
	)

	if (isProtectedRoute && !refreshToken) {
		return NextResponse.redirect(new URL('/', url))
	}

	if (isPrivateRoute) {
		if (!refreshToken) return NextResponse.redirect(new URL('/', url))

		try {
			const response = await fetch(`${api}/user/me`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			})

			if (!response.ok) {
				throw new Error('Failed to fetch user profile')
			}

			const user = await response.json()

			if (!user.role) {
				return NextResponse.redirect(new URL('/', url))
			}
		} catch (error) {
			console.error('Failed to get user data:', error)
			return NextResponse.redirect(new URL('/', url))
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/my/:path*', '/cart/:path*', '/write/:path*', '/:path*']
}
