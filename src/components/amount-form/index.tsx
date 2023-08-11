import { useEffect, useState, BaseSyntheticEvent } from 'react';
import { Form, Label, Input, ErrorMessage } from './index.styles';
import CurrencyPicker from '@/src/components/currency-picker';

type Countries = {
	[key: string]: string;
};

type Props = {
	countries: Countries;
};

const AmountForm = ({ countries }: Props) => {
	const [inputValue, setInputValue] = useState<string>('');
	const [inputErrorMessage, setInputErrorMessage] = useState<string | undefined>();
	const [currencyDataSource, setCurrencyDataSource] = useState<string[]>([]);
	const [currencyPickerIsDisabled, setCurrencyPickerIsDisabled] = useState<boolean>(true);

	useEffect(() => {
		let currencies = [];
		for (let key in countries) currencies.push(countries[key]);
		setCurrencyDataSource(currencies.sort());
	}, [countries]);

	const validateAmount = (e: BaseSyntheticEvent): void => {
		const value: string = e.target.value;
		const isDecimalValue: boolean = value.includes('.');
		if (value.length && !isDecimalValue) {
			setInputErrorMessage(undefined);
			setCurrencyPickerIsDisabled(false);
		} else {
			setCurrencyPickerIsDisabled(true);
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
				<CurrencyPicker dataSource={currencyDataSource} isDisabled={currencyPickerIsDisabled} />
			</div>
		</Form>
	);
};

export default AmountForm;
