export interface Currencies {
	[key: string]: string;
}

export interface HomeProps {
	currencies?: Currencies;
}

export interface DataSource {
	value: string;
	imgUrl?: string;
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
