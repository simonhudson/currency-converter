import { BaseSyntheticEvent } from 'react';
import TypeAhead from '@/src/components/typeahead';
import { Wrapper, ElementWrapper } from './index.styles';

type Props = {
	dataSource: string[];
	onItemSelect: (item: string, e: BaseSyntheticEvent) => void;
};

const CurrencyPicker = ({ dataSource, onItemSelect }: Props) => {
	return (
		<Wrapper>
			<ElementWrapper>
				<TypeAhead
					dataSource={dataSource}
					inputId="currency-picker-from"
					label="From"
					onItemSelect={onItemSelect}
					placeholder="Search currency"
				/>
			</ElementWrapper>

			<ElementWrapper>
				<TypeAhead
					dataSource={dataSource}
					inputId="currency-picker-to"
					label="To"
					onItemSelect={onItemSelect}
					placeholder="Search currency"
				/>
			</ElementWrapper>
		</Wrapper>
	);
};

export default CurrencyPicker;
