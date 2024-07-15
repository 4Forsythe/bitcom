import { Heading } from '@/components/ui/Heading'
import { Catalog } from '@/components/Catalog'

import { categoryService } from '@/services/category.service'

export default async function CatalogPage() {
	const categories = await categoryService.getAll()

	return (
		<>
			<Heading title='Каталог товаров' />
			<Catalog categories={categories} />
		</>
	)
}
