import { useEffect, useState, BaseSyntheticEvent } from 'react';

type Countries = {
	[key: string]: string;
};

export const getStaticProps = async () => {
	let countriesData: Countries;
	const response = await fetch(`https://openexchangerates.org/api/currencies.json`);

	if (response?.status === 200) {
		countriesData = await response.json();
		return {
			props: {
				countries: countriesData,
			},
		};
	} else {
		return {
			props: {},
		};
	}
};

type Props = {
	countries: Countries | undefined;
};

const Home = ({ countries }: Props) => {
	const [dataLoadingError, setDataLoadingError] = useState<string | undefined>();
	const [inputValue, setInputValue] = useState<string>('');
	const [inputErrorMessage, setInputErrorMessage] = useState<string | undefined>();

	//const [reverseConversionDirection, setReverseConversionDirection] = useState<boolean>(false);

	useEffect(() => {
		if (!countries) setDataLoadingError('Sorry, we could not load currency data');
	}, [countries]);

	const validateAmount = (e: BaseSyntheticEvent): void => {
		const value: string = e.target.value;
		const isDecimalValue: boolean = value.split('.').length > 1;
		if (!value.length) setInputErrorMessage('Please enter a value in the "Amount" field');
		if (isDecimalValue) setInputErrorMessage(`${value} is not a valid number`);
	};

	return (
		<>
			<h1>Currency Converter</h1>
			{dataLoadingError ? (
				<p>{dataLoadingError}</p>
			) : (
				<form aria-label="currency-converter">
					<div>
						<label htmlFor="amount">Amount</label>
						<input
							id="amount"
							onBlur={(e) => validateAmount(e)}
							onChange={(e) => setInputValue(e.target.value)}
							type="number"
							value={inputValue}
						/>
						{inputErrorMessage && (
							<p id="input-error-message" role="alert">
								{inputErrorMessage}
							</p>
						)}
					</div>
				</form>
			)}
		</>
	);
};

export default Home;
