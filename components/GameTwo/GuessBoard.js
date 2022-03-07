import React from 'react'
import classNames from 'classnames';

const GuessBoard = ({ pokemonImgs, show }) => {

	const { other, front_default } = pokemonImgs || {};
	const imgUrl = other['official-artwork'].front_default || front_default;

	const classes = classNames([
		'w-6/12',
		'h-auto',
		'border-4',
		'border-red-700',
		'rounded-lg',
		'mx-auto',
		'relative'
	]);

	return (
		<div className={classes}>
			<figure className='w-72 absolute top-[16%] left-8'>
				<img className={`w-full h-auto ${!show ? 'brightness-0' : ''}`} src={imgUrl || ''} alt='pokemon_img'/>
			</figure>
			<img className='border-4 rounded-lg' src='/images/guess_pokemon_background.jpg' alt='guess_background'/>
		</div>
	)
}

export default GuessBoard