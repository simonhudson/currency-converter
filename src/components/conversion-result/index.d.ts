interface CurrencyData {
	name: string;
	imgUrl?: string;
	value: number;
}

export interface ConversionResultProps {
	from?: CurrencyData;
	to?: CurrencyData;
	onSwitchDirectionClick: () => void;
}
