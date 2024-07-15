import { redirect } from 'next/navigation'

import { ROUTE } from '@/config/routes.config'

export default function ProductPage() {
	return redirect(ROUTE.CATALOG)
}
