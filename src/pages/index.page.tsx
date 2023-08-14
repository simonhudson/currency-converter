import { useEffect, useState, BaseSyntheticEvent, useCallback, createRef } from 'react';
import AmountForm from '@/src/components/amount-form';
import CurrencyPicker from '@/src/components/currency-picker';
import ConversionResult from '@/src/components/conversion-result';
import { Button } from '@/src/styles/forms.styles';

import Modal from '@/src/components/modal';

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

type ConversionObject = {
	name: string;
	code: string;
};

type ConvertedValue = {
	from: number;
	to: number;
};

const Home = ({ currencies }: Props) => {
	const amountInputRef = createRef<HTMLInputElement>();
	const convertFromInputRef = createRef<HTMLInputElement>();
	const convertToInputRef = createRef<HTMLInputElement>();

	const [dataLoadingError, setDataLoadingError] = useState<string | undefined>();
	const [currencyPickerDataSource, setCurrencyPickerDataSource] = useState<string[]>([]);
	const [amount, setAmount] = useState<number | undefined>();

	const [conversionErrorMessage, setConversionErrorMessage] = useState<string>('');
	const [convertFrom, setConvertFrom] = useState<ConversionObject | undefined>();
	const [convertTo, setConvertTo] = useState<ConversionObject | undefined>();
	const [convertedValue, setConvertedValue] = useState<ConvertedValue | undefined>();

	useEffect(() => {
		if (!currencies) setDataLoadingError('Sorry, we could not load currency data');
		let currencyNames = [];
		for (let key in currencies) currencyNames.push(`${key} ${currencies[key]}`);
		setCurrencyPickerDataSource(currencyNames.sort());
	}, [currencies]);

	const doConversion = useCallback(async (): Promise<void> => {
		if (amount && convertFrom?.name && convertFrom?.code && convertTo?.name && convertTo?.code) {
			const response = await fetch(
				`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${convertFrom.code}`
			);
			const data = await response.json();
			if (data.result !== 'success') {
				setConversionErrorMessage('Sorry, we could not convert your currency. Please try again.');
			} else {
				setConvertedValue({
					from: amount,
					to: Math.round(data.conversion_rates[convertTo.code] * amount),
				});
			}
		}
	}, [amount, convertFrom, convertTo]);

	useEffect(() => {
		doConversion();
	}, [convertTo, convertFrom, doConversion]);

	const switchConversionDirection = (): void => {
		setConvertFrom(convertTo);
		setConvertTo(convertFrom);
	};

	const getCurrencyCode = (name: string): string => Object.keys(currencies!).find((key) => name.includes(key)) ?? '';

	const onSubmit = (): void => {
		const fromValue: string = convertFromInputRef?.current?.value ?? '';
		const toValue: string = convertToInputRef?.current?.value ?? '';
		const amountValue: number = parseInt(amountInputRef?.current?.value ?? '', 10);
		setConvertFrom({ name: fromValue, code: getCurrencyCode(fromValue) });
		setConvertTo({ name: toValue, code: getCurrencyCode(toValue) });
		setAmount(amountValue);
	};

	return (
		<>
			<h1>Currency Converter</h1>
			{dataLoadingError ? (
				<p>{dataLoadingError}</p>
			) : (
				<>
					<AmountForm onValidInput={(value: number) => setAmount(value)} ref={amountInputRef} />
					<CurrencyPicker
						dataSource={currencyPickerDataSource}
						ref={{
							from: convertFromInputRef,
							to: convertToInputRef,
						}}
					/>
					<Button
						onClick={(e) => {
							e.preventDefault();
							onSubmit();
						}}
					>
						Convert
					</Button>
					{conversionErrorMessage ||
						(convertedValue && convertFrom && convertTo && (
							<Modal>
								<ConversionResult
									errorMessage={conversionErrorMessage}
									from={{
										name: convertFrom.name,
										value: convertedValue.from,
									}}
									to={{
										name: convertTo.name,
										value: convertedValue.to,
									}}
									onSwitchDirectionClick={switchConversionDirection}
								/>
							</Modal>
						))}
				</>
			)}
		</>
	);
};

export default Home;
