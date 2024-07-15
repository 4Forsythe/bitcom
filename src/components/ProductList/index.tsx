'use client'

import { SearchBar } from '../SearchBar'
import { Filters } from '@/components/Filters'
import { Sort } from '@/components/Sort'
import { ProductCard } from '@/components/ProductCard'
import { Pagination } from '@/components/Pagination'
import { EmptyBlock } from '@/components/EmptyBlock'

import { ProductsType } from '@/types/product.types'

import styles from './ProductList.module.scss'

interface ProductListProps {
	products: ProductsType
}

export const ProductList = ({ products }: ProductListProps) => {
	return (
		<div className={styles.container}>
			<aside className={styles.sidebar}>
				<Filters />
			</aside>
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
						<EmptyBlock title='К сожалению, товары не были найдены на нашем складе. Попробуйте зайти сюда чуть позже.' />
					)}
				</div>
				{products.items.length > 0 && <Pagination total={products.count} />}
			</div>
		</div>
	)
}
