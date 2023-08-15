export interface TypeAheadProps {
	dataSource: string[];
	inputId: string;
	label: string;
	labelInfo?: string;
	minQueryLength?: number;
	placeholder?: string;
	showAllResultsOnFocus?: boolean;
}
