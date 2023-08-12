import { Wrapper } from './index.styles';

type CurrencyData = {
	currency: string;
	value: number;
};

type Props = {
	from: CurrencyData;
	to: CurrencyData;
};

const ConversionResult = ({ from, to }: Props) => {
	return (
		<Wrapper>
			<p role="alert">
				{from.value} {from.currency} is equivalent to {to.value} {to.currency}
			</p>
		</Wrapper>
	);
};

export default ConversionResult;
