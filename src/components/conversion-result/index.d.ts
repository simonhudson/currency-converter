import type { CurrencyData } from '@/src/types/currency';
export interface ConversionResultProps {
	from?: CurrencyData;
	to?: CurrencyData;
	onSwitchDirectionClick: () => void;
}
