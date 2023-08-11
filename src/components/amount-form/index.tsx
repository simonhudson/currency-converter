import { useState, BaseSyntheticEvent } from 'react';
import { Form, Label, Input, ErrorMessage } from './index.styles';

const AmountForm = () => {
	const [inputValue, setInputValue] = useState<string>('');
	const [inputErrorMessage, setInputErrorMessage] = useState<string | undefined>();

	const validateAmount = (e: BaseSyntheticEvent): void => {
		const value: string = e.target.value;
		const isDecimalValue: boolean = value.includes('.');
		if (value.length && !isDecimalValue) {
			setInputErrorMessage(undefined);
		} else {
			if (!value.length) setInputErrorMessage('Please enter a value in the "Amount" field');
			if (isDecimalValue) setInputErrorMessage(`${value} is not a valid number`);
		}
	};

	return (
		<Form aria-label="currency-converter">
			<div>
				<Label htmlFor="amount">Amount</Label>
				<Input
					id="amount"
					onBlur={(e) => validateAmount(e)}
					onChange={(e) => setInputValue(e.target.value)}
					type="number"
					value={inputValue}
				/>
				{!!inputErrorMessage && (
					<ErrorMessage id="input-error-message" role="alert">
						{inputErrorMessage}
					</ErrorMessage>
				)}
			</div>
		</Form>
	);
};

export default AmountForm;
