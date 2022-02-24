import React from 'react'

const Pokeball = ({ size }) => {
	return (
		<div class={`pokeball ${ size === 'small' ? 'pokeball-small' : ''} animate-pokeball`}>
			<div class={`pokeball-button ${ size === 'small' ? 'pokeball-button-small' : ''} animate-blink-custom`}></div>
		</div>
	)
}

export default Pokeball