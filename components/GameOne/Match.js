import React, { useEffect, memo } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../data/api';
import { useGameDispatch, ActionTypes } from './GameContext';

const Match = ({ data, readonly }) => {
	const dispatch = useGameDispatch();
	const mappedData = data && data.url ? useSWR(data.url, fetcher).data : data;
	const { sprites = {}, name } = mappedData || {};

	useEffect(() => {
		if (mappedData && !readonly) {
			console.log('here')
			dispatch({ type: ActionTypes.UPDATE_MATCHES, payload: mappedData });
		}
	}, [mappedData])

	return (
		<div className='flex flex-col items-center m-2 w-36'>
			<img src={sprites['front_default']} alt={name} />
			<p className='font-pokemon-solid capitalize tracking-[.15em]'>{name}</p>
		</div>
	);
};

export default memo(Match);
