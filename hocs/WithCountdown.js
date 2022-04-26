import React, { useState } from 'react';
import Countdown from 'react-countdown';

const WithCountdown = ({ children, ...props }) => {
	const [countdown, setCountdown] = useState(false);

	const handleEnd = () => {
		setCountdown(false);
		if (props.onEnd) props.onEnd();
	};

	const renderTimer = ({ total, minutes, seconds, completed }) => {
		if (completed) {
			handleEnd();
			return <></>
		} else {
			const formatTime = time => +time < 10 ? `0${time}` : time;
			const formatMinutes = formatTime(minutes);
			const formattedSeconds = formatTime(seconds);
			const withinLimit = (+total / 1000) <= props.closeToEndThreshold;

			return (
				<span className={`countdown-timer countdown-text-${withinLimit ? 'red' : 'lime'} font-pixel text-3xl flex justify-center items-center translate-y-1.5`}>
					{`${formatMinutes}:`}{formattedSeconds}
				</span>
			);
		}
	}

	return (
		<div className='flex flex-col w-full'>
			{children({ setCountdown })}
			{countdown && (
				<div className='w-full flex items-center justify-center'>
					<div className='countdown-wrapper w-36 flex justify-center items-center p-2 rounded-md'>
						<Countdown
							date={Date.now() + props.countdownTime}
							renderer={renderTimer}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default WithCountdown;
