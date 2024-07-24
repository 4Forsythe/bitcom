import { Heading } from '@/components/ui/Heading'
import { Product } from '@/app/(section)/product/[id]/Product'

import { productService } from '@/services/product.service'

interface ProductPageProps {
	params: { id: string }
}

const getProduct = async (params: { id: string }) => {
	return productService.getOne(params.id)
}

export const revalidate = 60

export default async function ProductPage({ params }: ProductPageProps) {
	const product = await getProduct(params)

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
