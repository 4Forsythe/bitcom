export const Skeleton = () => {
	return (
		<div className='max-w-[500px] h-[180px] p-3.5 gap-3 flex'>
			<span className='w-[150px] h-[150px] bg-gray-200 rounded-md animate-pulse' />
			<div className='gap-1.5 flex flex-col grow'>
				<span className='w-1/2 h-8 bg-gray-200 rounded-md animate-pulse' />
				<span className='w-full h-16 bg-gray-200 rounded-md animate-pulse' />
			</div>
		</div>
	)
}
