import React, { useEffect, memo } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import { fetcher } from '../../data/api';
import { useGameDispatch, ActionTypes } from './GameContext';
import Pokeball from '../Pokeball';

const Match = ({ incomingData, readonly }) => {
	const dispatch = useGameDispatch();
	const { data } = incomingData || {};
	const { data: mappedData, error } = data && data.url ? useSWR(data.url, fetcher) : incomingData;
	const isLoading = !error && !mappedData;
	const { sprites = {}, name } = mappedData || {};

	const imgUrl = sprites['front_default'] || '';

	useEffect(() => {
		if (mappedData && !readonly) {
			dispatch({ type: ActionTypes.UPDATE_MATCHES, payload: mappedData });
		}
	}, [mappedData])

	return (
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
};

export default memo(Match);
