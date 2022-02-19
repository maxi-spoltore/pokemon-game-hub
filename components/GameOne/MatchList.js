import React from 'react'
import Match from './Match';

const MatchList = ({ matches }) => {
	return (
		<div className='flex flex-wrap mt-8 bg-red-200 rounded-lg max-h-[320px] overflow-y-auto'>
			{!!matches && !!matches.length && matches.map((match, idx) => {
				const key = `match-${match}-${idx}`;
				return <Match key={key} data={match} />
			})}
		</div>
	);
}

export default MatchList