import type { DataSource } from '@/src/pages/index.d';

export interface TypeAheadProps {
	dataSource: DataSource[];
	inputId: string;
	label: string;
	labelInfo?: string;
	minQueryLength?: number;
	placeholder?: string;
	showAllResultsOnFocus?: boolean;
}
