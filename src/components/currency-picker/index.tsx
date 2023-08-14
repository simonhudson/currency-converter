import { RefObject, forwardRef } from 'react';
import TypeAhead from '@/src/components/typeahead';
import { Wrapper, ElementWrapper } from './index.styles';

type Props = {
	dataSource: string[];
	fromInputRef: RefObject<HTMLInputElement>;
	toInputRef: RefObject<HTMLInputElement>;
};
const CurrencyPicker = forwardRef<HTMLInputElement, Props>(({ dataSource, fromInputRef, toInputRef }, ref) => {
	return (
		<Wrapper>
			<ElementWrapper>
				<TypeAhead dataSource={dataSource} inputId="currency-picker-from" label="From" ref={fromInputRef} />
			</ElementWrapper>

			<ElementWrapper>
				<TypeAhead dataSource={dataSource} inputId="currency-picker-to" label="To" ref={toInputRef} />
			</ElementWrapper>
		</Wrapper>
	);
});

CurrencyPicker.displayName = 'CurrencyPicker';

export default CurrencyPicker;
