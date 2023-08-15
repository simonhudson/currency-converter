interface CurrencyData {
	name: string;
	flagUrl: string;
	value: number;
}

export interface ConversionResultProps {
	from?: CurrencyData;
	to?: CurrencyData;
	onSwitchDirectionClick: () => void;
}
