interface CurrencyData {
	name: string;
	value: number;
}

export interface ConversionResultProps {
	from?: CurrencyData;
	to?: CurrencyData;
	onSwitchDirectionClick: () => void;
}
