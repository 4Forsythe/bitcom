import { redirect } from 'next/navigation'

import { Breadcrumb, Product } from '@/components'
import { getImage } from '@/components/dynamic-image'

import { ROUTE } from '@/config/routes.config'
import { productService } from '@/services/product.service'
import { SimilarList } from '@/components/SimilarList'

const getProduct = async (id: string) => {
	const data = await productService.getOne(id)

	if (!data) redirect(ROUTE.SEARCH)

	return data
}

const getSimilar = async (id: string, params?: { take: number }) => {
	return productService.getSimilar(id, params)
}

export const generateMetadata = async ({ params }: ProductPageProps) => {
	const product = await getProduct(params.id)

	return {
		title: `${product.name} — купить в Тольятти, Самаре, Сызрани`,
		description: `${product.name} — купить Б/У с гарантией по самым выгодным ценам в Тольятти, Самаре, Сызрани. В наличии ${product.count} шт. Наш каталог обновляется регулярно, и вы всегда сможете найти самые актуальные предложения и новинки. Кроме того, у нас всегда есть выгодные акции и скидки по разным позициям! Доставка по всей Самарской области, включая города Самара, Тольятти, Сызрань.`
	}
}

export const revalidate = 60

interface ProductPageProps {
	params: { id: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = params

	const product = await getProduct(id)
	const similar = await getSimilar(id)

	const imagePlaceholder = product.imageUrl
		? (await getImage(product.imageUrl)).base64
		: product.category
			? product.category.imageUrl
			: '/static/catalog/image-placeholder.png'

	return (
		<>
			<Breadcrumb
				value={product.name}
				items={[
					{ href: ROUTE.HOME, value: 'Главная' },
					{ href: ROUTE.CATALOG, value: 'Каталог' }
				]}
			/>
			<Product
				{...product}
				imagePlaceholder={imagePlaceholder}
			/>
			{similar.items.length > 0 && (
				<SimilarList
					categoryId={product?.category?.id}
					{...similar}
				/>
			)}
		</>
	)
}
