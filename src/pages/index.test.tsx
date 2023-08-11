import React from 'react';
import Home, { getStaticProps } from './index.page';
import { screen, render } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import countriesData from '@/test/mock-data/countries';

const ORIGINAL_FETCH = global.fetch;

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
	});

	afterEach(() => {
		jest.clearAllMocks();
		global.fetch = ORIGINAL_FETCH;
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
			setFetchResponse(countriesData, 400);

			// When
			const staticProps = await getStaticProps();

			// Then
			expect(staticProps.props.countries).toEqual(undefined);
		});

		it('should handle undefined', async () => {
			// Given
			setFetchResponse(undefined, 200);

			// When
			const staticProps = await getStaticProps();

			// Then
			expect(staticProps.props.countries).toEqual(undefined);
		});
		it('should handle success response', async () => {
			// Given
			setFetchResponse(countriesData, 200);

			// When
			const staticProps = await getStaticProps();

			// Then
			expect(staticProps.props.countries).toEqual(countriesData);
		});
	});

	it(`should render expected heading`, () => {
		// When
		render(<Home countries={undefined} />);

		// Then
		expect(screen.getByRole('heading')).toHaveTextContent('Currency Converter');
	});

	describe('should render expected UI when ', () => {
		it('no countries data available', () => {
			// When
			render(<Home countries={undefined} />);

			// Then
			expect(screen.getByText('Sorry, we could not load currency data')).toBeInTheDocument();
			expect(screen.queryByRole('form')).not.toBeInTheDocument();
		});

		it('countries data is available', () => {
			// When
			render(<Home countries={countriesData} />);

			// Then
			expect(screen.queryByText('Sorry, we could not load currency data')).not.toBeInTheDocument();
			expect(screen.getByRole('form')).toBeInTheDocument();
			expect(screen.getByLabelText('Amount')).toBeInTheDocument();
			expect(screen.queryByRole('alert')).not.toBeInTheDocument();
		});
	});

	describe('Input validation', () => {
		it('should render error message for empty value', () => {
			// Given
			render(<Home countries={countriesData} />);
			const input = screen.getByLabelText('Amount');
			expect(screen.queryByRole('alert')).not.toBeInTheDocument();

			// When
			fireEvent.change(input, { target: { value: '' } });
			fireEvent.blur(input);

			// Then
			expect(screen.getByRole('alert')).toBeInTheDocument();
			expect(screen.getByText('Please enter a value in the "Amount" field')).toBeInTheDocument();
		});
		it('should render error message for invalid value', () => {
			// Given
			render(<Home countries={countriesData} />);
			const input = screen.getByLabelText('Amount');
			expect(screen.queryByRole('alert')).not.toBeInTheDocument();

			// When
			fireEvent.change(input, { target: { value: '123.456' } });
			fireEvent.blur(input);

			// Then
			expect(screen.getByRole('alert')).toBeInTheDocument();
			expect(screen.getByText('123.456 is not a valid number')).toBeInTheDocument();
		});
	});
});
