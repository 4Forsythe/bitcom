import { Heading } from '@/components/ui/Heading'
import { ProductList } from '@/components/ProductList'

import { getSearchParams } from '@/utils/get-search-params'

import { productService } from '@/services/product.service'
import { calcNounDeclension } from '@/utils/calc-noun-declension'
import { formatCase } from '@/utils/format-case'
import { deviceService } from '@/services/device.service'
import { Suspense } from 'react'

const getProducts = async (searchParams: {
	[key: string]: string | undefined
}) => {
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

	return productService.getAll({
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
}

export const generateMetadata = async ({ searchParams }: SearchPageProps) => {
	const data = await getProducts(searchParams)

	const { query, device, brand } = getSearchParams(searchParams)

	if (!data) {
		return {
			title: `${query ? `Поиск — ${query}` : 'Результаты поиска'}`
		}
	}

	const items = data.items.map((item) => item.name).join(', ')

	return {
		title: `${query ? `Поиск — ${query}` : 'Результаты поиска'}`,
		description: `${device || brand || query || 'Поиск'} — купить Б/У по самым выгодным ценам в городе Тольятти. ${items}. Всего ${data.count} шт. Доставка по всей Самарской области, включая города Самара, Тольятти, Сызрань.`
	}
}

export const revalidate = 60

interface SearchPageProps {
	searchParams: { [key: string]: string | undefined }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const { query } = getSearchParams(searchParams)

	const data = await getProducts(searchParams)

	return (
		<>
			<Heading
				title={query ? `Поиск — ${query}` : 'Результаты поиска'}
				control
			/>
			<ProductList products={data} />
		</>
	)
}
