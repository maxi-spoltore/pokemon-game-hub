import React from 'react'

const Pokeball = ({ size }) => {
	return (
		<div className={`pokeball ${ size === 'small' ? 'pokeball-small' : ''} animate-pokeball`}>
			<div className={`pokeball-button ${ size === 'small' ? 'pokeball-button-small' : ''} animate-blink-custom`}></div>
		</div>
	)
}

export default Pokeball