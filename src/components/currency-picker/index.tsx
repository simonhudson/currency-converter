import { BaseSyntheticEvent, forwardRef } from 'react';
import TypeAhead from '@/src/components/typeahead';
import { Wrapper, ElementWrapper } from './index.styles';

type Props = {
	dataSource: string[];
	onItemSelect: (item: string, e: BaseSyntheticEvent) => void;
	ref: {
		from: React.ForwardedRef<HTMLInputElement>;
		to: React.ForwardedRef<HTMLInputElement>;
	};
};
const CurrencyPicker = forwardRef(({ dataSource, onItemSelect }: Props, ref) => {
	return (
		<Wrapper>
			<ElementWrapper>
				<TypeAhead
					dataSource={dataSource}
					inputId="currency-picker-from"
					label="From"
					onItemSelect={onItemSelect}
					ref={ref?.from}
				/>
			</ElementWrapper>

			<ElementWrapper>
				<TypeAhead
					dataSource={dataSource}
					inputId="currency-picker-to"
					label="To"
					onItemSelect={onItemSelect}
					ref={ref?.to}
				/>
			</ElementWrapper>
		</Wrapper>
	);
});
CurrencyPicker.displayName = 'CurrencyPicker';

export default CurrencyPicker;
