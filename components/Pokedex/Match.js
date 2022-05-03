import React, { useEffect, memo } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../data/api';
import { useGameDispatch, ActionTypes } from './GameContext';
import BaseMatch from '../BaseMatch';

const Dynamic = ({ rawData }) => {
	const dispatch = useGameDispatch();
	const { data, error } = useSWR(rawData.data.url, fetcher);
	const isLoading = !error && !data;
	const { sprites = {}, name } = data || {};

	const imgUrl = sprites['front_default'] || '';

	useEffect(() => {
		if (data) {
			dispatch({ type: ActionTypes.UPDATE_MATCHES, payload: data });
		}
	}, [data])

	return <BaseMatch name={name} imgUrl={imgUrl} isLoading={isLoading} />
};

const Static = ({ rawData }) => {
	const { data } = rawData || {};

	const { sprites = {}, name } = data || {};

	const imgUrl = sprites['front_default'] || '';

	return <BaseMatch name={name} imgUrl={imgUrl} isLoading={false} />
};

const Match = ({ type, rawData }) => {
	return type === 'dynamic' ? <Dynamic rawData={rawData} /> : <Static rawData={rawData} />
}

export default memo(Match);
