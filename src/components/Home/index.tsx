'use client'

import { Navbar } from '@/components/Navbar'
import { Company } from '@/components/Company'

import { YMaps, Map, Placemark } from 'react-yandex-maps'

import styles from './Home.module.scss'
import { News } from '@/components/News'
import { Features } from '../Features'
import { PostCard } from '@/app/(root)/blog/[id]/PostCard'
import { useQuery } from '@tanstack/react-query'
import { postService } from '@/services/post.service'
import { Skeleton } from '../Features/FeaturesCard/Skeleton'
import { productService } from '@/services/product.service'
import { ProductCard } from '@/app/(wide)/product/[id]/ProductCard'
import { FeaturesCard } from '../Features/FeaturesCard'
import { DiscountCard } from '../DiscountCard'
import { Carousel } from '../Carousel'

export const Home = () => {
	const {
		data: posts,
		isLoading: isPostsLoading,
		isSuccess: isPostsSuccess,
		isError: isPostsError
	} = useQuery({
		queryKey: ['posts'],
		queryFn: () => postService.getAll({ take: 8 })
	})

	const {
		data: products,
		isLoading: isProductsLoading,
		isSuccess: isProductsSuccess,
		isError: isProductsError
	} = useQuery({
		queryKey: ['products'],
		queryFn: () => productService.getAll({ take: 8 })
	})

	return (
		<div className={styles.container}>
			<Navbar />
			<News />
			{!isProductsError &&
				(products === undefined || products.items.length > 0) && (
					<Features
						title='Новинки'
						items={
							isProductsLoading
								? [...new Array(4)].map((item, index) => (
										<Skeleton key={index} />
									))
								: products?.items.map((item) => (
										<FeaturesCard
											key={item.id}
											item={item}
										/>
									))
						}
					/>
				)}
			{!isPostsError && (posts === undefined || posts.items.length > 0) && (
				<Features
					title='Интересные статьи'
					items={
						isPostsLoading
							? [...new Array(4)].map((item, index) => <Skeleton key={index} />)
							: posts?.items.map((item) => (
									<FeaturesCard
										key={item.id}
										item={item}
									/>
								))
					}
				/>
			)}
			<Company />
		</div>
	)
}
