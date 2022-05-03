import React from 'react';
import Image from 'next/image';
import Pokeball from './Pokeball';

const BaseMatch = ({ name, imgUrl, isLoading }) => (
	<>
		{isLoading ? (
			<div className='flex justify-center items-center w-[96px] h-[96px]'>
				<Pokeball size='small' />
			</div>
		) : (
			<div className='flex flex-col items-center m-2 w-36 '>
				{imgUrl && (
					<Image
						src={imgUrl}
						width={96}
						height={96}
						alt={name}
						quality={100}
						placeholder='blur'
						blurDataURL='/images/blur.png'
						/>)}
				<p className='font-pokemon-solid capitalize tracking-[.15em]'>{name}</p>
			</div>
		)}
	</>
);

export default BaseMatch;
