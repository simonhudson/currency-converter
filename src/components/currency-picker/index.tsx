import { forwardRef } from 'react';
import TypeAhead from '@/src/components/typeahead';
import { Wrapper, ElementWrapper } from './index.styles';

type Props = {
	dataSource: string[];
};
const CurrencyPicker = forwardRef(({ dataSource }: Props, ref) => {
	return (
		<Wrapper>
			<ElementWrapper>
				<TypeAhead dataSource={dataSource} inputId="currency-picker-from" label="From" ref={ref?.from} />
			</ElementWrapper>

			<ElementWrapper>
				<TypeAhead dataSource={dataSource} inputId="currency-picker-to" label="To" ref={ref?.to} />
			</ElementWrapper>
		</Wrapper>
	);
});

CurrencyPicker.displayName = 'CurrencyPicker';

export default CurrencyPicker;
