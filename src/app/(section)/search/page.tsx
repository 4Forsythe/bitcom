import { Heading } from '@/components/ui/Heading'
import { ProductList } from '@/components/ProductList'

import { getSearchParams } from '@/utils/get-search-params'

import { productService } from '@/services/product.service'
import { calcNounDeclension } from '@/utils/calc-noun-declension'

export const revalidate = 60

interface SearchPageProps {
	searchParams: { [key: string]: string | undefined }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const {
		query,
		category,
		device,
		brand,
		model,
		sortBy,
		orderBy,
		page,
		limit
	} = getSearchParams(searchParams)

	const products = await productService.getAll({
		name: query,
		categoryId: category,
		deviceId: device,
		brandId: brand,
		modelId: model,
		sortBy: sortBy,
		orderBy: orderBy,
		take: limit,
		skip: (page - 1) * limit
	})

	return (
		<>
			<Heading
				title={
					query
						? `Поиск — ${query}`
						: `Найдено: ${calcNounDeclension(products.count, 'товар', 'товара', 'товаров')}`
				}
			/>
			<ProductList products={products} />
		</>
	)
}
