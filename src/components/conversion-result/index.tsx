import { SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import { Paragraph } from './index.styles';
import SwitchDirection from '@/src/components/switch-direction';
import type { ConversionResultProps } from './index.d';

const startCountdown = (setHasExpired: { (value: SetStateAction<boolean>): void; (arg0: boolean): void }): void => {
	let endTime: number, hours: number, mins: number, msLeft: number, time: Date;

	const twoDigits = (n: number): number | string => (n <= 9 ? '0' + n : n);

	const updateTimer = (): void => {
		msLeft = endTime - +new Date();
		if (msLeft < 1000) {
			setHasExpired(true);
		} else {
			time = new Date(msLeft);
			hours = time.getUTCHours();
			mins = time.getUTCMinutes();
			element!.innerHTML = (hours ? hours + ':' + twoDigits(mins) : mins) + ':' + twoDigits(time.getUTCSeconds());
			setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
		}
	};

	const element: HTMLSpanElement | null = document.getElementById('countdown-timer');
	if (element) {
		endTime = +new Date() + 1000 * (60 * 10 + 0) + 500;
		updateTimer();
	}
};

const ConversionResult = ({ from, to, onSwitchDirectionClick }: ConversionResultProps) => {
	const [hasExpired, setHasExpired] = useState<boolean>(false);

	useEffect(() => {
		startCountdown(setHasExpired);
	}, []);

	return (
		<>
			{hasExpired ? (
				<Paragraph role="alert">Your conversion has expired. Please fill in the form again.</Paragraph>
			) : (
				<>
					<Paragraph role="alert">
						<Image alt="" src={from?.flagUrl ?? ''} /> {from?.value.toLocaleString()} {from?.name}{' '}
						<span>is equivalent to </span>
						<Image alt="" src={to?.flagUrl ?? ''} /> {to?.value.toLocaleString()} {to?.name}
					</Paragraph>
					<Paragraph>
						Expires in <span id="countdown-timer"></span>
					</Paragraph>
					<SwitchDirection onClick={onSwitchDirectionClick} />
				</>
			)}
		</>
	);
};

export default ConversionResult;
