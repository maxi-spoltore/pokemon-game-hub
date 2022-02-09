import React from 'react';
import useSWR from 'swr';
import { fetcher } from '../../data/api';

const Match = ({ data }) => {
	const { data: pokemonData } = useSWR(data.url, fetcher);
	const { sprites = {}, name } = pokemonData || {};
	return (
		<div className='flex flex-col items-center m-2 w-36'>
			<img src={sprites['front_default']} alt={name} />
			<p className='font-pokemon-solid capitalize tracking-[.15em]'>{name}</p>
		</div>
	);
};

export default Match;
