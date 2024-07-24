import { Heading } from '@/components/ui/Heading'
import { Catalog } from '@/app/(section)/catalog/Catalog'

import { categoryService } from '@/services/category.service'

const getCategories = async () => {
	return categoryService.getAll()
}

export const revalidate = 60

export default async function CatalogPage() {
	const data = await getCategories()

	return (
		<>
			<Heading title='Каталог товаров' />
			<Catalog categories={data} />
		</>
	)
}
