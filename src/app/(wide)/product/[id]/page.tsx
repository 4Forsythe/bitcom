import { Heading } from '@/components/ui/Heading'
import { Product } from '@/app/(wide)/product/[id]/Product'

import { productService } from '@/services/product.service'
import { redirect } from 'next/navigation'
import { ROUTE } from '@/config/routes.config'

const getProduct = async (id: string) => {
	const data = await productService.getOne(id)

	if (!data) redirect(ROUTE.SEARCH)

	return data
}

export const generateMetadata = async ({ params }: ProductPageProps) => {
	const product = await getProduct(params.id)

	return {
		title: `${product.name} — купить в Тольятти, Самаре, Сызрани`,
		description: `${product.name} — купить Б/У с гарантией по самым выгодным ценам в городе Тольятти. В наличии ${product.count} шт. Наш каталог обновляется регулярно, и вы всегда сможете найти самые актуальные предложения и новинки. Кроме того, у нас всегда есть выгодные акции и скидки по разным позициям! Доставка по всей Самарской области, включая города Самара, Тольятти, Сызрань.`
	}
}

export const revalidate = 60

interface ProductPageProps {
	params: { id: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
	const product = await getProduct(params.id)

	return (
		<>
			<Heading
				title={product.name}
				control
			/>
			<Product product={product} />
		</>
	)
}
