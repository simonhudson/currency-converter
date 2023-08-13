import { SetStateAction, useEffect, useState } from 'react';
import { Paragraph } from './index.styles';
import SwitchDirection from '@/src/components/switch-direction';

type CurrencyData = {
	name: string;
	value: number;
};

type Props = {
	from?: CurrencyData;
	to?: CurrencyData;
	errorMessage?: string;
	isLoading?: boolean;
	onSwitchDirectionClick: () => void;
};

const startCountdown = (setHasExpired: { (value: SetStateAction<boolean>): void; (arg0: boolean): void }): void => {
	var endTime: number, hours: number, mins: number, msLeft: number, time: Date;

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

const ConversionResult = ({ from, to, errorMessage, onSwitchDirectionClick }: Props) => {
	const [hasExpired, setHasExpired] = useState<boolean>(false);

	useEffect(() => {
		startCountdown(setHasExpired);
	}, []);

	if (errorMessage) return <p role="alert">{errorMessage}</p>;
	return (
		<>
			{hasExpired ? (
				<Paragraph role="alert">Your conversion has expired. Please fill in the form again.</Paragraph>
			) : (
				<>
					<Paragraph role="alert">
						{from?.value.toLocaleString()} {from?.name} <span>is equivalent to </span>
						{to?.value.toLocaleString()} {to?.name}
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
