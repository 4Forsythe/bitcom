export const Skeleton = () => {
	return (
		<div className='p-3 gap-2.5 flex flex-col'>
			<div className='w-full h-[150px] bg-gray-200 rounded-md animate-pulse' />
			<div className='h-10 gap-2.5 flex items-center justify-between'>
				<span className='h-full grow bg-gray-200 rounded-md animate-pulse' />
				<span className='w-[40px] h-full bg-gray-200 rounded-md animate-pulse' />
			</div>
		</div>
	)
}
