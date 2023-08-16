import type { CurrencyItem } from '@/src/types/currency';

export interface HomeProps {
	currenciesData?: CurrencyItem[];
}

export interface ConvertedValue {
	from: number;
	to: number;
}
