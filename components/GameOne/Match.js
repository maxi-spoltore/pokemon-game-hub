import React, { useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../data/api';
import { useGameDispatch, ActionTypes } from './GameContext';

const Match = ({ data }) => {
	const dispatch = useGameDispatch();
	const mappedData = data && data._preFetched ? data : useSWR(data.url, fetcher).data;
	const { sprites = {}, name } = mappedData || {};

	useEffect(() => {
		if (mappedData && !mappedData._preFetched) {
			mappedData._preFetched = true;
			dispatch({ type: ActionTypes.UPDATE_MATCHES, payload: mappedData });
		}
	}, [mappedData, data])

	return (
		<div className='flex flex-col items-center m-2 w-36'>
			<img src={sprites['front_default']} alt={name} />
			<p className='font-pokemon-solid capitalize tracking-[.15em]'>{name}</p>
		</div>
	);
};

export default Match;
