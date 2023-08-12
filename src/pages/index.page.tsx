import { useEffect, useState, BaseSyntheticEvent, useCallback } from 'react';
import AmountForm from '@/src/components/amount-form';
import CurrencyPicker from '@/src/components/currency-picker';
import ConversionResult from '@/src/components/conversion-result';
import { Button } from '@/src/styles/forms.styles';

type Currencies = {
	[key: string]: string;
};

export const getStaticProps = async () => {
	let currenciesData: Currencies;
	const response = await fetch(`https://openexchangerates.org/api/currencies.json`);

	if (response?.status === 200) {
		currenciesData = await response.json();
		return {
			props: {
				currencies: currenciesData,
			},
		};
	} else {
		return {
			props: {},
		};
	}
};

type Props = {
	currencies?: Currencies;
};

const Home = ({ currencies }: Props) => {
	const [dataLoadingError, setDataLoadingError] = useState<string | undefined>();
	const [currencyPickerDataSource, setCurrencyPickerDataSource] = useState<string[]>([]);
	const [selectedFromCurrency, setSelectedFromCurrency] = useState<string>('');
	const [selectedToCurrency, setSelectedToCurrency] = useState<string>('');
	const [selectedFromValue, setSelectedFromValue] = useState<number | undefined>();
	const [selectedToValue, setSelectedToValue] = useState<number | undefined>();
	const [amount, setAmount] = useState<number | undefined>();

	useEffect(() => {
		if (!currencies) setDataLoadingError('Sorry, we could not load currency data');
		let currencyNames = [];
		for (let key in currencies) currencyNames.push(`${key} ${currencies[key]}`);
		setCurrencyPickerDataSource(currencyNames.sort());
	}, [currencies]);

	const doConversion = useCallback(async (): Promise<void> => {
		if (amount && selectedFromCurrency && selectedToCurrency) {
			const response = await fetch(
				`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${selectedFromCurrency}`
			);
			const data = await response.json();
			setSelectedFromValue(amount);
			setSelectedToValue(Math.round(data.conversion_rates[selectedToCurrency] * amount));
		}
	}, [amount, selectedFromCurrency, selectedToCurrency]);

	const switchConversionDirection = () => {
		setSelectedFromCurrency(selectedToCurrency);
		setSelectedToCurrency(selectedFromCurrency);
	};

	useEffect(() => {
		doConversion();
	}, [selectedFromCurrency, selectedToCurrency, doConversion]);

	const onCurrencySelection = (selectedValue: string, e: BaseSyntheticEvent): void => {
		const isFromSelection = e.target.dataset.inputId.includes('from');
		const isToSelection = e.target.dataset.inputId.includes('to');
		const currencyCode = Object.keys(currencies!).find((key) => selectedValue.includes(key)) ?? '';
		if (isFromSelection) setSelectedFromCurrency(currencyCode);
		if (isToSelection) setSelectedToCurrency(currencyCode);
	};

	return (
		<>
			<h1>Currency Converter</h1>
			{dataLoadingError ? (
				<p>{dataLoadingError}</p>
			) : (
				<>
					<AmountForm onValidInput={(value) => setAmount(value)} />
					<CurrencyPicker
						dataSource={currencyPickerDataSource}
						onDirectionSwitch={switchConversionDirection}
						onItemSelect={(item: string, e: BaseSyntheticEvent) => onCurrencySelection(item, e)}
					/>
					<Button
						onClick={(e) => {
							e.preventDefault();
							doConversion();
						}}
					>
						Convert
					</Button>
					{selectedFromValue && selectedToValue && (
						<ConversionResult
							from={{
								currency: selectedFromCurrency,
								value: selectedFromValue,
							}}
							to={{
								currency: selectedToCurrency,
								value: selectedToValue,
							}}
						/>
					)}
				</>
			)}
		</>
	);
};

export default Home;
