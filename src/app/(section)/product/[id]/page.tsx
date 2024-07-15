import { Product } from '@/components/Product'

import { productService } from '@/services/product.service'

interface ProductPageProps {
	params: { id: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
	const product = await productService.getOne(params.id)

	return <Product product={product} />
}
