import Image from 'next/image'

import { Heart } from 'lucide-react'

import { ProductType } from '@/types/product.types'

import styles from './Product.module.scss'

export const Product = ({ product }: { product: ProductType }) => {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.cover}>
					<Image
						className={styles.image}
						width={1000}
						height={1000}
						src={'/images/image-placeholder.png'}
						alt={product.name}
						priority
					/>
				</div>
				<div className={styles.information}>
					<div className={styles.overview}>
						<h1 className={styles.title}>{product.name}</h1>
						<p className={styles.description}>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem
							quam ad nisi amet ratione nihil! Voluptatibus ullam voluptatum
							consequuntur aliquid, qui aspernatur dignissimos voluptates
							praesentium, illum quod, nihil quae? Commodi, odit tempora!
						</p>
					</div>
					<div className={styles.options}>
						<div className={styles.availables}>
							<span className={styles.breadcrumb}>
								В наличии {product.count} шт.
							</span>
							<span className={styles.breadcrumb}>{product.barcodes}</span>
						</div>
						<div className={styles.features}>
							<div className={styles.controls}>
								<button className={styles.buy}>Добавить в корзину</button>
								<button className={styles.wishlist}>
									<Heart className={styles.icon} />
								</button>
							</div>
							<span className={styles.price}>{product.price} ₽</span>
						</div>
					</div>
					<div className={styles.details}>
						<span className={styles.title}>Характеристики товара</span>
						<ul className={styles.characteristics}>
							<li className={styles.characteristic}>
								Тип устройства
								<span>{product.device?.name}</span>
							</li>
							<li className={styles.characteristic}>
								Бренд
								<span>{product.brand}</span>
							</li>
							<li className={styles.characteristic}>
								Модель
								<span>{product.model}</span>
							</li>
							<li className={styles.characteristic}>
								Гарантия
								<span>3 мес.</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}
