import React from 'react'
import { Toaster as BaseToaster, ToastBar } from 'react-hot-toast';
import Pokeball from './Pokeball';

const Toaster = () => {
	const containerStyle = {
		position: 'fixed',
		top: '70%',
		left: '25%'
	};

	const toastBarStyle = {
		boxShadow: 'none'
	}

	return (
		<BaseToaster containerStyle={containerStyle}>
			{(t) => (
					<ToastBar toast={t} style={toastBarStyle}>
						{({ message }) => (
							<div className='flex flex-col items-center'>
								<Pokeball />
								<div className='font-pokemon-solid tracking-[.15em] mt-4 animate-bounce'>
									{message}
								</div>
							</div>
						)}
					</ToastBar>
			)}
		</BaseToaster>
	)
}

export default Toaster