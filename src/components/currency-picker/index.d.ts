import { RefObject } from 'react';
import type { CurrencyItem } from '@/src/types/currency.d';

export interface CurrencyPickerProps {
	dataSource: CurrencyItem[];
	fromInputRef: RefObject<HTMLInputElement>;
	toInputRef: RefObject<HTMLInputElement>;
}
