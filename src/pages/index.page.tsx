import { useEffect, useState } from 'react';
import AmountForm from '@/src/components/amount-form';

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

	useEffect(() => {
		if (!countries) setDataLoadingError('Sorry, we could not load currency data');
	}, [countries]);

	return (
		<>
			<h1>Currency Converter</h1>
			{dataLoadingError ? <p>{dataLoadingError}</p> : <AmountForm countries={countries} />}
		</>
	);
};

export default Home;
