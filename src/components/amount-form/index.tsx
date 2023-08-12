import { useState, BaseSyntheticEvent } from 'react';
import { Input, Label, ErrorMessage } from '@/src/styles/forms.styles';
import { Form } from './index.styles';

type Props = {
	onValidInput: (value: number) => void;
};

const AmountForm = ({ onValidInput }: Props) => {
	const [inputValue, setInputValue] = useState<string>('');
	const [inputErrorMessage, setInputErrorMessage] = useState<string | undefined>();

	const validateAmount = (e: BaseSyntheticEvent): void => {
		const value: string = e.target.value;
		const isDecimalValue: boolean = value.includes('.');
		if (value.length && !isDecimalValue) {
			setInputErrorMessage(undefined);
			onValidInput(Number(value));
		} else {
			if (!value.length) setInputErrorMessage('Please enter a value in the "Amount" field');
			if (isDecimalValue)
				setInputErrorMessage(
					`${value} is not a valid number. Please enter whole numbers only, without decimals`
				);
		}
	};

	return (
		<Form aria-label="currency-converter">
			<div>
				<Label htmlFor="amount">
					Amount
					{!!inputErrorMessage && (
						<ErrorMessage id="input-error-message" role="alert">
							{inputErrorMessage}
						</ErrorMessage>
					)}
				</Label>
				<Input
					id="amount"
					onBlur={(e) => validateAmount(e)}
					onChange={(e) => setInputValue(e.target.value)}
					type="number"
					value={inputValue}
				/>
			</div>
		</Form>
	);
};

export default AmountForm;
