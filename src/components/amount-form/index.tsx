import { useState, BaseSyntheticEvent, forwardRef } from 'react';
import { Input, Label, ErrorMessage } from '@/src/styles/forms.styles';

type Props = {
	onValidInput: (value: number) => void;
};

const AmountForm = forwardRef<HTMLInputElement, Props>(({ onValidInput }, ref) => {
	const [inputValue, setInputValue] = useState<string>('');
	const [inputErrorMessage, setInputErrorMessage] = useState<string | undefined>();

	const validateAmount = (e: BaseSyntheticEvent): void => {
		const value: string = ref?.current?.value;
		const isDecimalValue: boolean = value.includes('.');
		if (value.length && !isDecimalValue) {
			setInputErrorMessage(undefined);
			onValidInput(Number(value));
		} else {
			if (!value.length) setInputErrorMessage('Error: Please enter a value in the "Amount" field.');
			if (isDecimalValue)
				setInputErrorMessage(
					`Error: ${value} is not a valid number. Please enter whole numbers only, without decimals.`
				);
		}
	};

	return (
		<form>
			<Label htmlFor="amount">
				Amount
				{!!inputErrorMessage && (
					<ErrorMessage role="alert" id="input-error-message">
						{inputErrorMessage}
					</ErrorMessage>
				)}
			</Label>
			<Input
				aria-errormessage={`${!!inputErrorMessage ? 'input-error-message' : null}`}
				aria-invalid={!!inputErrorMessage}
				aria-required="true"
				id="amount"
				onBlur={(e) => validateAmount(e)}
				onChange={(e) => setInputValue(e.target.value)}
				placeholder="Whole numbers only"
				ref={ref}
				type="number"
				value={inputValue}
			/>
		</form>
	);
});
AmountForm.displayName = 'AmountForm';

export default AmountForm;
