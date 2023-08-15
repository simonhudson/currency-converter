import { useEffect, useState, useCallback, useRef } from 'react';
import AmountForm from '@/src/components/amount-form';
import CurrencyPicker from '@/src/components/currency-picker';
import ConversionResult from '@/src/components/conversion-result';
import { Button } from '@/src/styles/forms.styles';
import Modal from '@/src/components/modal';
import { ErrorMessage } from '@/src/styles/forms.styles';
import { HomeProps, Currencies, ConversionObject, ConvertedValue } from './index.d';

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

const Home = ({ currencies }: HomeProps) => {
	const amountInputRef = useRef<HTMLInputElement | null>(null);
	const convertFromInputRef = useRef<HTMLInputElement | null>(null);
	const convertToInputRef = useRef<HTMLInputElement | null>(null);

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

	const getCurrencyCode = (currencyName: string): string =>
		Object.keys(currencies!).find((key) => currencyName.includes(key)) ?? '';
	const getFlagUrl = (currencyName: string): string =>
		`https://flagcdn.com/24x18/${currencyName.slice(0, 2).toLowerCase() ?? ''}.png`;

	const clearValues = (callback: () => void): void => {
		setConvertFrom(undefined);
		setConvertTo(undefined);
		setAmount(undefined);
		setConvertedValue(undefined);
		callback();
	};

	const onSubmit = (): void => {
		if (
			convertFromInputRef?.current?.value &&
			convertToInputRef?.current?.value &&
			amountInputRef?.current?.value
		) {
			const fromValue: string = convertFromInputRef?.current?.value;
			const toValue: string = convertToInputRef?.current?.value;
			const amountValue: number = parseInt(amountInputRef?.current?.value, 10);

			clearValues(() => {
				setConvertFrom({
					name: fromValue,
					code: getCurrencyCode(fromValue),
					flagUrl: getFlagUrl(fromValue),
				});
				setConvertTo({
					name: toValue,
					code: getCurrencyCode(toValue),
					flagUrl: getFlagUrl(toValue),
				});
				setAmount(amountValue);
			});
		}
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
						fromInputRef={convertFromInputRef}
						toInputRef={convertToInputRef}
					/>
					<Button
						onClick={(e) => {
							e.preventDefault();
							onSubmit();
						}}
					>
						Convert
					</Button>
					{conversionErrorMessage && (
						<ErrorMessage as="p" role="alert">
							{conversionErrorMessage}
						</ErrorMessage>
					)}
					{!conversionErrorMessage && convertedValue && convertFrom && convertTo && (
						<Modal>
							<ConversionResult
								from={{
									name: convertFrom.name,
									flagUrl: convertFrom.flagUrl,
									value: convertedValue.from,
								}}
								to={{
									name: convertTo.name,
									flagUrl: convertTo.flagUrl,
									value: convertedValue.to,
								}}
								onSwitchDirectionClick={switchConversionDirection}
							/>
						</Modal>
					)}
				</>
			)}
		</>
	);
};

export default Home;
