'use client'

import { Sort } from '@/components/Sort'
import { Filters } from '@/components/Filters'
import { SearchBar } from '@/components/SearchBar'
import { ProductCard } from '@/app/(section)/product/[id]/ProductCard'
import { EmptyBlock } from '@/components/EmptyBlock'
import { Pagination } from '@/components/ui/Pagination'

import { ProductsType } from '@/types/product.types'
import { useWindowSize } from '@/hooks/useWindowSize'

import styles from './ProductList.module.scss'

export const ProductList = ({ products }: { products: ProductsType }) => {
	const { width } = useWindowSize()

	const isTablet = width && width <= 1024

	return (
		<div className={styles.container}>
			<aside className={styles.sidebar}>{!isTablet && <Filters />}</aside>
			<div className={styles.inner}>
				<div className={styles.search}>
					<SearchBar />
				</div>
				<Sort isProducts />
				<div className={styles.list}>
					{products.items && products.items.length > 0 ? (
						products.items.map((product) => (
							<ProductCard
								{...product}
								key={product.id}
							/>
						))
					) : (
						<EmptyBlock title='К сожалению, товары не были найдены на нашем складе. Очень скоро мы это исправим!' />
					)}
				</div>
				{products.items.length > 0 && <Pagination total={products.count} />}
			</div>
		</div>
	)
}
