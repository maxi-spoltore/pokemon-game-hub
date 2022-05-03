import React, { memo } from 'react'
import { Toaster as BaseToaster, ToastBar } from 'react-hot-toast';
import Pokeball from './Pokeball';

const Toaster = ({ renderType }) => {
	const containerStyle = {
		position: 'fixed',
		top: renderType === 'pokeball' ? '70%' : '60%',
		left: renderType === 'pokeball' ? '25%' : '0'
	};

	const toastBarStyle = {
		boxShadow: renderType === 'pokeball' ? 'none' : '2px 2px 20px rgba(0,0,0,.2)'
	};

	return (
		<BaseToaster containerStyle={containerStyle}>
			{(t) => (
					<ToastBar toast={t} style={toastBarStyle}>
						{({ message }) => (
							<>
								{renderType === 'pokeball' ? (
									<div className='flex flex-col items-center'>
										<Pokeball />
										<div className='font-pokemon-solid tracking-[.15em] mt-4 animate-bounce'>
											{message}
										</div>
									</div>
									) : (
										<div className='text-xl text-center font-bold text-red-700 rounded-lg'>{message}</div>
									)
								}
							</>
						)}
					</ToastBar>
			)}
		</BaseToaster>
	)
}

export default memo(Toaster)