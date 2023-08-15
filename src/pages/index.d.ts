export interface Currencies {
	[key: string]: string;
}

export interface HomeProps {
	currencies?: Currencies;
}

export interface ConversionObject {
	name: string;
	code: string;
	flagUrl: string;
}

export interface ConvertedValue {
	from: number;
	to: number;
}