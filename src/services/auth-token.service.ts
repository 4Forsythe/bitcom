import Cookies from 'js-cookie'

export enum TokenEnum {
	ACCESS_TOKEN = 'accessToken',
	REFRESH_TOKEN = 'refreshToken'
}

export const getAccessToken = () => {
	const accessToken = Cookies.get(TokenEnum.ACCESS_TOKEN)
	return accessToken || null
}

export const setAccessToken = (accessToken: string) => {
	Cookies.set(TokenEnum.ACCESS_TOKEN, accessToken, {
		domain: process.env.NEXT_PUBLIC_SITE_DOMAIN,
		sameSite: 'lax',
		expires: 14
	})
}

export const removeAccessToken = () => {
	Cookies.remove(TokenEnum.ACCESS_TOKEN)
}
