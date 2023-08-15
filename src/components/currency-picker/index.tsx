import { forwardRef } from 'react';
import TypeAhead from '@/src/components/typeahead';
import { Wrapper, ElementWrapper } from './index.styles';
import type { CurrencyPickerProps } from './index.d';

const CurrencyPicker = forwardRef<HTMLInputElement, CurrencyPickerProps>(
	({ dataSource, fromInputRef, toInputRef }, ref) => {
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
	}
);

CurrencyPicker.displayName = 'CurrencyPicker';

export default CurrencyPicker;
