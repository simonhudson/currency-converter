import type { CurrencyItem } from '@/src/types/currency.d';

export interface TypeAheadProps {
	dataSource: CurrencyItem[];
	inputId: string;
	label: string;
	labelInfo?: string;
	minQueryLength?: number;
	placeholder?: string;
	showAllResultsOnFocus?: boolean;
}
