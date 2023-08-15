import { RefObject } from 'react';
import type { DataSource } from '@/src/pages.d';

export interface CurrencyPickerProps {
	dataSource: DataSource[];
	fromInputRef: RefObject<HTMLInputElement>;
	toInputRef: RefObject<HTMLInputElement>;
}
