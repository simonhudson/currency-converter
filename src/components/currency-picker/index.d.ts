import { RefObject } from 'react';

export interface CurrencyPickerProps {
	dataSource: string[];
	fromInputRef: RefObject<HTMLInputElement>;
	toInputRef: RefObject<HTMLInputElement>;
}
