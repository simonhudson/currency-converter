import { useEffect, useState, useCallback, useRef } from 'react';
import AmountForm from '@/src/components/amount-form';
import CurrencyPicker from '@/src/components/currency-picker';
import ConversionResult from '@/src/components/conversion-result';
import { Button } from '@/src/styles/forms.styles';
import Modal from '@/src/components/modal';
import { ErrorMessage } from '@/src/styles/forms.styles';
import { HomeProps, ConvertedValue } from './index.d';
import type { CurrencyItem } from '@/src/types/currency.d';

export const getStaticProps = async () => {
	let currenciesData;
	const response = await fetch(`https://openexchangerates.org/api/currencies.json`);

	if (response?.status === 200) {
		currenciesData = await response.json();
		const dataObj: CurrencyItem[] = [];
		for (let key in currenciesData) {
			dataObj.push({
				name: `${key} ${currenciesData[key]}`,
				code: key,
				imgUrl: `https://flagcdn.com/24x18/${key.slice(0, 2).toLowerCase() ?? ''}.png`,
			});
		}
		return {
			props: {
				currenciesData: dataObj,
			},
		};
	} else {
		return {
			props: {},
		};
	}
};

const Home = ({ currenciesData }: HomeProps) => {
	const amountInputRef = useRef<HTMLInputElement | null>(null);
	const convertFromInputRef = useRef<HTMLInputElement | null>(null);
	const convertToInputRef = useRef<HTMLInputElement | null>(null);

	const [dataLoadingError, setDataLoadingError] = useState<string | undefined>();
	const [currencyPickerDataSource, setCurrencyPickerDataSource] = useState<CurrencyItem[]>([]);
	const [amount, setAmount] = useState<number | undefined>();

	const [conversionErrorMessage, setConversionErrorMessage] = useState<string>('');
	const [convertFrom, setConvertFrom] = useState<CurrencyItem | undefined>();
	const [convertTo, setConvertTo] = useState<CurrencyItem | undefined>();
	const [convertedValue, setConvertedValue] = useState<ConvertedValue | undefined>();

	useEffect(() => {
		if (!currenciesData) setDataLoadingError('Sorry, we could not load currency data');
		else setCurrencyPickerDataSource(currenciesData);
	}, [currenciesData]);

	const doConversion = useCallback(async (): Promise<void> => {
		if (amount && convertFrom?.name && convertFrom?.code && convertTo?.name && convertTo?.code) {
			const response = await fetch(
				`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${convertFrom.code}`
			);
			const data = await response.json();

			if (data?.result !== 'success') {
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

	const clearValues = (): void => {
		setConvertFrom(undefined);
		setConvertTo(undefined);
		setAmount(undefined);
		setConvertedValue(undefined);
	};

	const onSubmit = (): void => {
		const fromInput = convertFromInputRef?.current;
		const toInput = convertToInputRef?.current;
		const amountInput = amountInputRef?.current;

		if (fromInput?.value && toInput?.value && amountInput?.value) {
			setConvertFrom(
				currenciesData?.find((item) => {
					if (item.name) return fromInput.value.includes(item.name);
				})
			);
			setConvertTo(
				currenciesData?.find((item) => {
					if (item.name) return toInput.value.includes(item.name);
				})
			);
			setAmount(parseInt(amountInput.value, 10));
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
						<Modal onClose={clearValues}>
							<ConversionResult
								from={{
									name: convertFrom.name,
									imgUrl: convertFrom.imgUrl,
									value: convertedValue.from,
								}}
								to={{
									name: convertTo.name,
									imgUrl: convertTo.imgUrl,
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
