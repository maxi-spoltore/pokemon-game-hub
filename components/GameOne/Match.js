import React, { useEffect, memo } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import { fetcher } from '../../data/api';
import { useGameDispatch, ActionTypes } from './GameContext';

const Match = ({ data, readonly }) => {
	const dispatch = useGameDispatch();
	const mappedData = data && data.url ? useSWR(data.url, fetcher).data : data;
	const { sprites = {}, name } = mappedData || {};

	const imgUrl = sprites['front_default'] || '';

	useEffect(() => {
		if (mappedData && !readonly) {
			dispatch({ type: ActionTypes.UPDATE_MATCHES, payload: mappedData });
		}
	}, [mappedData])

	return (
		<div className='flex flex-col items-center m-2 w-36 '>
			{imgUrl && <Image src={imgUrl} width={96} height={96} alt={name} quality={100} />}
			<p className='font-pokemon-solid capitalize tracking-[.15em]'>{name}</p>
		</div>
	);
};

export default memo(Match);
