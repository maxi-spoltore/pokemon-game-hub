import React from 'react'
import Match from './Match';

const MatchList = ({ matches }) => {
	return (
		<div className='flex flex-wrap justify-center mt-8 bg-red-200 rounded-lg max-h-[320px] overflow-y-auto'>
			{!!matches && !!matches.length && matches.map((match, idx) => {
				const key = `match-${match}-${idx}`;
				return <Match key={key} incomingData={{ data: match }} readonly />
			})}
		</div>
	);
}

export default MatchList