import React from 'react';
import ConversionResult from './index';
import { screen, render, act } from '@testing-library/react';

describe('ConversionResult', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	it('should render as expected when conversion has not expired', () => {
		// When
		render(
			<ConversionResult
				from={{
					currency: 'XXX',
					value: 12345,
				}}
				to={{
					currency: 'YYY',
					value: 67890,
				}}
			/>
		);

		// Then
		expect(screen.getByRole('alert')).toBeInTheDocument();
		// expect(screen.getByText('12,345 XXX is equivalent to 67,890 YYY')).toBeInTheDocument();
		expect(
			screen.getByText((_, element) => element!.textContent === '12,345 XXX is equivalent to 67,890 YYY')
		).toBeInTheDocument();
		expect(
			screen.queryByText('Your conversion has expired. Please fill in the form again.')
		).not.toBeInTheDocument();
	});

	it('should render as expected when conversion has expired', () => {
		// When
		render(
			<ConversionResult
				from={{
					currency: 'XXX',
					value: 12345,
				}}
				to={{
					currency: 'YYY',
					value: 67890,
				}}
			/>
		);
		expect(screen.getByRole('alert')).toBeInTheDocument();
		expect(
			screen.getByText((_, element) => element!.textContent === '12,345 XXX is equivalent to 67,890 YYY')
		).toBeInTheDocument();
		expect(
			screen.queryByText('Your conversion has expired. Please fill in the form again.')
		).not.toBeInTheDocument();

		// When
		act(() => {
			jest.runAllTimers();
		});

		// Then
		expect(screen.getByRole('alert')).toBeInTheDocument();
		expect(
			screen.queryByText((_, element) => element!.textContent === '12,345 XXX is equivalent to 67,890 YYY')
		).not.toBeInTheDocument();
		expect(screen.getByText('Your conversion has expired. Please fill in the form again.')).toBeInTheDocument();
	});
});
