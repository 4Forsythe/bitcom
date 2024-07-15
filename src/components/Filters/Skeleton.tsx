export const Skeleton = () => {
	return (
		<div className='mb-2.5 px-4 py-3 gap-2.5 flex flex-col bg-zinc-50'>
			<div className='w-full h-8 mb-1.5 bg-gray-200 rounded-md animate-pulse'></div>
			<span className='w-full h-32 bg-gray-200 rounded-md animate-pulse' />
		</div>
	)
}
