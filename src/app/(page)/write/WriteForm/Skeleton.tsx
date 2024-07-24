export const Skeleton = () => {
	return (
		<div className='w-full gap-1.5 flex flex-col'>
			<span className='h-10 w-9/12 bg-gray-200 rounded-md animate-pulse' />
			<span className='h-10 w-9/12 bg-gray-200 rounded-md animate-pulse' />
			<div className='h-24 w-full bg-gray-200 rounded-md animate-pulse' />
		</div>
	)
}
