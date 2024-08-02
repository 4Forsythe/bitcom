import { Heading } from '@/components/ui/Heading'
import { ProductList } from '@/components/ProductList'

import { getSearchParams } from '@/utils/get-search-params'
import { calcNounDeclension } from '@/utils/calc-noun-declension'

import { productService } from '@/services/product.service'
import { productCategoryService } from '@/services/product-category.service'
import { redirect } from 'next/navigation'
import { ROUTE } from '@/config/routes.config'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { formatCase } from '@/utils/format-case'

const getCategory = async (id: string) => {
	try {
		const data = await productCategoryService.getOne(id)
		if (!data) redirect(ROUTE.HOME)

		return data
	} catch (error) {
		console.error(error)
		redirect(ROUTE.HOME)
	}
}

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

export const generateMetadata = async ({
	params,
	searchParams
}: ProductsPageProps) => {
	const category = await getCategory(params.id)
	const data = await getProducts(params.id, searchParams)

	if (!data) {
		return {
			title: `${formatCase(category.name)} — купить Б/У по самым выгодным ценам в Тольятти`
		}
	}

	const items = data.items.map((item) => item.name).join(', ')

	return {
		title: `${formatCase(category.name)} — купить Б/У по самым выгодным ценам в Тольятти`,
		description: `${formatCase(category.name)} — купить Б/У по самым выгодным ценам в Тольятти. ${items}. Всего ${data.count} шт. Доставка по всей Самарской области, включая города Самара, Тольятти, Сызрань.`
	}
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
				control
			/>
			<ProductList products={data} />
		</>
	)
}
