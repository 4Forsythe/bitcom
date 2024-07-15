export type CategoryType = {
	id: string
	name: string
	imageUrl: string
}

export type CategoriesType = {
	items: CategoryType[]
	count: number
}
