import { SetStateAction, useEffect, useState } from 'react';
import { Wrapper } from './index.styles';

type CurrencyData = {
	currency: string;
	value: number;
};

type Props = {
	from: CurrencyData;
	to: CurrencyData;
};

const startCountdown = (setHasExpired: { (value: SetStateAction<boolean>): void; (arg0: boolean): void }): void => {
	var endTime: number, hours: number, mins: number, msLeft: number, time: Date;

	const twoDigits = (n: number): number | string => {
		return n <= 9 ? '0' + n : n;
	};

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

const ConversionResult = ({ from, to }: Props) => {
	const [hasExpired, setHasExpired] = useState<boolean>(false);

	useEffect(() => {
		startCountdown(setHasExpired);
	}, []);

	return (
		<Wrapper>
			{hasExpired ? (
				<p role="alert">Your conversion has expired. Please fill in the form again.</p>
			) : (
				<>
					<p role="alert">
						{from.value.toLocaleString()} {from.currency} is equivalent to {to.value.toLocaleString()}{' '}
						{to.currency}
					</p>
					<p>
						Expires in <span id="countdown-timer"></span>
					</p>
				</>
			)}
		</Wrapper>
	);
};

export default ConversionResult;
