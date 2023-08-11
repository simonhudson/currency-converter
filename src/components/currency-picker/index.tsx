import { useEffect, useState } from 'react';
import TypeAhead from '@/src/components/typeahead';
import { Wrapper, ElementWrapper } from './index.styles';

type Props = {
	dataSource: string[];
	isDisabled?: boolean;
};

const CurrencyPicker = ({ dataSource, isDisabled }: Props) => {
	return (
		<Wrapper>
			<ElementWrapper>
				<TypeAhead
					dataSource={dataSource}
					inputId="currency-picker-from"
					isDisabled={isDisabled}
					label="From"
					placeholder="Search currency"
				/>
			</ElementWrapper>
			<ElementWrapper>
				<TypeAhead
					dataSource={dataSource}
					inputId="currency-picker-to"
					isDisabled={isDisabled}
					label="To"
					placeholder="Search currency"
				/>
			</ElementWrapper>
		</Wrapper>
	);
};

export default CurrencyPicker;
