import React from 'react';
import Home, { getStaticProps } from './index.page';
import { screen, render } from '@testing-library/react';
import currenciesData from '@/test/mock-data/currencies';

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
			setFetchResponse(currenciesData, 400);

			// When
			const staticProps = await getStaticProps();

			// Then
			expect(staticProps.props.currencies).toEqual(undefined);
		});

		it('should handle undefined', async () => {
			// Given
			setFetchResponse(undefined, 200);

			// When
			const staticProps = await getStaticProps();

			// Then
			expect(staticProps.props.currencies).toEqual(undefined);
		});
		it('should handle success response', async () => {
			// Given
			setFetchResponse(currenciesData, 200);

			// When
			const staticProps = await getStaticProps();

			// Then
			expect(staticProps.props.currencies).toEqual(currenciesData);
		});
	});

	it(`should render expected heading`, () => {
		// When
		render(<Home currencies={undefined} />);

		// Then
		expect(screen.getByRole('heading')).toHaveTextContent('Currency Converter');
	});

	describe('should render expected UI when ', () => {
		it('no currencies data available', () => {
			// When
			render(<Home currencies={undefined} />);

			// Then
			expect(screen.getByText('Sorry, we could not load currency data')).toBeInTheDocument();
			expect(screen.queryByRole('form')).not.toBeInTheDocument();
			expect(screen.queryByLabelText('Amount')).not.toBeInTheDocument();
		});

		it('currencies data is available', () => {
			// When
			render(<Home currencies={currenciesData} />);

			// Then
			expect(screen.queryByText('Sorry, we could not load currency data')).not.toBeInTheDocument();
			expect(screen.getByLabelText('Amount')).toBeInTheDocument();
		});
	});
});
