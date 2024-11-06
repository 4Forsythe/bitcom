import { redirect } from 'next/navigation'

import { Catalog, Breadcrumb } from '@/components'

import { ROUTE } from '@/config/routes.config'
import { productCategoryService } from '@/services/product-category.service'

const getCategories = async () => {
	try {
		const data = await productCategoryService.getAll()
		if (!data) redirect(ROUTE.HOME)

		return data
	} catch (error) {
		console.error(error)
		redirect(ROUTE.HOME)
	}
}

export const generateMetadata = async () => {
	const data = await productCategoryService.getAll()

	if (!data || data.items.length === 0) {
		return {
			title: 'Каталог товаров'
		}
	}

	const items = data.items
		.map((item) => item.name)
		.join(', ')
		.toLowerCase()

	return {
		title: 'Каталог товаров',
		description: `Компания «БитКом» предоставляет широкий выбор товаров для офиса и дома: ${items}. Наш каталог обновляется регулярно, и вы всегда сможете найти самые актуальные предложения и новинки. Кроме того, у нас всегда есть выгодные акции и скидки по разным позициям!`
	}
}

export const revalidate = 60

export default async function CatalogPage() {
	const categories = await getCategories()

	return (
		<>
			<Breadcrumb
				value='Каталог'
				items={[{ href: ROUTE.HOME, value: 'Главная' }]}
			/>
			<Catalog {...categories} />
		</>
	)
}
