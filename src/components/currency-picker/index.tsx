import { RefObject, forwardRef } from 'react';
import TypeAhead from '@/src/components/typeahead';
import { Wrapper, ElementWrapper } from './index.styles';

type Props = {
	dataSource: string[];
	inputRefs: {
		from: RefObject<HTMLInputElement>;
		to: RefObject<HTMLInputElement>;
	};
};
const CurrencyPicker = ({ dataSource, inputRefs }: Props) => {
	return (
		<Wrapper>
			<ElementWrapper>
				<TypeAhead dataSource={dataSource} inputId="currency-picker-from" label="From" ref={inputRefs?.from} />
			</ElementWrapper>

			<ElementWrapper>
				<TypeAhead dataSource={dataSource} inputId="currency-picker-to" label="To" ref={inputRefs?.to} />
			</ElementWrapper>
		</Wrapper>
	);
};

export default CurrencyPicker;
