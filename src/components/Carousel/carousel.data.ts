export type CarouselSlideType = {
	id: string
	tag: string
	imageUrl: string
}

export const SLIDES: CarouselSlideType[] = [
	{
		id: '1',
		tag: 'Первый слайд',
		imageUrl: `/static/banner/1.jpg`
	},
	{
		id: '2',
		tag: 'Второй слайд',
		imageUrl: `/static/banner/2.jpg`
	}
	// {
	// 	id: '3',
	// 	tag: 'Третий слайд',
	// 	imageUrl: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/static/product-categories/images/003.jpg`
	// }
]
