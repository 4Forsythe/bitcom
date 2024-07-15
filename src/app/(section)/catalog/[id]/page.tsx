import { Heading } from '@/components/ui/Heading'
import { ProductList } from '@/components/ProductList'

import { getSearchParams } from '@/utils/get-search-params'
import { calcNounDeclension } from '@/utils/calc-noun-declension'

import { productService } from '@/services/product.service'

const getProducts = async (
	id: string,
	searchParams?: { [key: string]: string | undefined }
) => {
	const { query, device, brand, model, sortBy, orderBy, page, limit } =
		getSearchParams(searchParams)

	return productService.getAll({
		name: query,
		categoryId: id,
		deviceId: device,
		brandId: brand,
		modelId: model,
		sortBy: sortBy,
		orderBy: orderBy,
		take: limit,
		skip: (page - 1) * limit
	})
}

export const revalidate = 60

interface ProductsPageProps {
	params: { id: string }
	searchParams?: { [key: string]: string | undefined }
}

export default async function ProductsPage({
	params,
	searchParams
}: ProductsPageProps) {
	const { id } = params
	const data = await getProducts(id, searchParams)

	return (
		<>
			<Heading
				title={`Найдено: ${calcNounDeclension(data.count, 'товар', 'товара', 'товаров')}`}
			/>
			<ProductList products={data} />
		</>
	)
}
