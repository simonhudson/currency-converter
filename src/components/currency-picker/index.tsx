import { BaseSyntheticEvent } from 'react';
import TypeAhead from '@/src/components/typeahead';
import { Wrapper, ElementWrapper } from './index.styles';
import { Button } from '@/src/styles/forms.styles';
import ReverseIcon from './reverse-icon';

type Props = {
	dataSource: string[];
	onDirectionSwitch: () => void;
	onItemSelect: (item: string, e: BaseSyntheticEvent) => void;
};

const CurrencyPicker = ({ dataSource, onDirectionSwitch, onItemSelect }: Props) => {
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
			<div>
				<Button onClick={() => onDirectionSwitch()}>
					<ReverseIcon />
				</Button>
			</div>
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
