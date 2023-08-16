import React from 'react';
import Home, { getStaticProps } from './index.page';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { currenciesApiResponse, currenciesData } from '@/test/mock-data/currencies';
import type { CurrencyItem } from '@/src/types/currency';

const ORIGINAL_FETCH = global.fetch;
const ORIGINAL_EXCHANGE_RATE_API_KEY = process.env.EXCHANGE_RATE_API_KEY;

describe('Home', () => {
	const setFetchResponse = (data: object | undefined, statusCode: number = 200): void => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve(data),
				status: statusCode,
			})
		) as jest.Mock;
	};

	beforeEach(() => {
		global.fetch = jest.fn();
		process.env.EXCHANGE_RATE_API_KEY = 'EXCHANGE_RATE_API_KEY_VALUE';
	});

	afterEach(() => {
		jest.clearAllMocks();
		global.fetch = ORIGINAL_FETCH;
		process.env.EXCHANGE_RATE_API_KEY = ORIGINAL_EXCHANGE_RATE_API_KEY;
	});

	describe('getStaticProps() method', () => {
		it('should make request with expected parameters', async () => {
			// When
			await getStaticProps();

			// Then
			expect(global.fetch).toHaveBeenCalledTimes(1);
			expect(global.fetch).toHaveBeenCalledWith(`https://openexchangerates.org/api/currencies.json`);
		});

		it('should handle error status code', async () => {
			// Given
			setFetchResponse(currenciesApiResponse, 400);

			// When
			const staticProps = await getStaticProps();

			// Then
			expect(staticProps.props.currenciesData).toEqual(undefined);
		});

		it('should handle undefined', async () => {
			// Given
			setFetchResponse(undefined, 200);

			// When
			const staticProps = await getStaticProps();

			// Then
			expect(staticProps.props.currenciesData).toEqual([]);
		});
		it('should handle success response', async () => {
			// Given
			setFetchResponse(currenciesApiResponse, 200);

			// When
			const staticProps = await getStaticProps();

			// Then
			expect(staticProps.props.currenciesData).toEqual(currenciesData);
		});
	});

	it(`should render expected heading`, () => {
		// When
		intialise();

		// Then
		expect(screen.getByRole('heading')).toHaveTextContent('Currency Converter');
	});

	describe('should render expected UI when ', () => {
		it('no currencies data available', () => {
			// When
			intialise();

			// Then
			expect(screen.getByText('Sorry, we could not load currency data')).toBeInTheDocument();
			expect(screen.queryByRole('form')).not.toBeInTheDocument();
			expect(screen.queryByLabelText('Amount')).not.toBeInTheDocument();
		});

		it('currencies data is available', () => {
			// When
			intialise(currenciesData);

			// Then
			expect(screen.queryByText('Sorry, we could not load currency data')).not.toBeInTheDocument();
			expect(screen.getByLabelText('Amount')).toBeInTheDocument();
		});
	});

	describe('Form submission', () => {
		const populateAndSubmitForm = () => {
			fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '10000' } });
			fireEvent.change(screen.getByLabelText('From'), { target: { value: 'GBP British Pound Sterling' } });
			fireEvent.change(screen.getByLabelText('To'), { target: { value: 'USD United States Dollar' } });
			fireEvent.click(screen.getByText('Convert'));
		};

		const assertApiCall = (currencyCode: string): void => {
			expect(global.fetch).toHaveBeenCalledTimes(1);
			expect(global.fetch).toHaveBeenCalledWith(
				`https://v6.exchangerate-api.com/v6/EXCHANGE_RATE_API_KEY_VALUE/latest/${currencyCode}`
			);
		};

		describe('Request conversion data', () => {
			it('should make expected API call', () => {
				// Given
				intialise(currenciesData);

				// When
				setFetchResponse({
					result: 'success',
					conversion_rates: {
						USD: 2,
					},
				});
				populateAndSubmitForm();

				// Then
				assertApiCall('GBP');
				waitFor(() =>
					expect(
						screen.queryByText('Sorry, we could not convert your currency. Please try again.')
					).not.toBeInTheDocument()
				);
			});

			it('should handle API error response', async () => {
				// Given
				intialise(currenciesData);

				// When
				setFetchResponse({
					result: 'foo',
				});
				populateAndSubmitForm();

				// Then
				assertApiCall('GBP');
				expect(
					await screen.findByText('Sorry, we could not convert your currency. Please try again.')
				).toBeInTheDocument();
			});
		});

		it('should render conversion result', async () => {
			// Given
			intialise(currenciesData);

			// When
			setFetchResponse({
				result: 'success',
				conversion_rates: {
					USD: 2,
				},
			});
			populateAndSubmitForm();

			// Then
			expect(
				await screen.findByText(
					(_, element) =>
						element!.textContent ===
						'10,000 GBP British Pound Sterling is equivalent to 20,000 USD United States Dollar'
				)
			).toBeInTheDocument();
		});

		it('should switch conversion direction on button click', async () => {
			// Given
			intialise(currenciesData);
			setFetchResponse({
				result: 'success',
				conversion_rates: {
					USD: 2,
				},
			});
			populateAndSubmitForm();
			expect(
				await screen.findByText(
					(_, element) =>
						element!.textContent ===
						'10,000 GBP British Pound Sterling is equivalent to 20,000 USD United States Dollar'
				)
			).toBeInTheDocument();

			// When
			setFetchResponse({
				result: 'success',
				conversion_rates: {
					GBP: 4,
				},
			});
			fireEvent.click(screen.getByText('Switch conversion direction'));

			// Then
			assertApiCall('USD');
			expect(
				await screen.findByText(
					(_, element) =>
						element!.textContent ===
						'10,000 USD United States Dollar is equivalent to 40,000 GBP British Pound Sterling'
				)
			).toBeInTheDocument();
		});
	});
	const intialise = (currenciesData?: CurrencyItem[]) => render(<Home currenciesData={currenciesData} />);
});
