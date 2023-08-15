import React from 'react';
import ConversionResult from './index';
import { screen, render, act } from '@testing-library/react';

describe('ConversionResult', () => {
	let onSwitchDirectionClickMock: jest.Mock;

	beforeEach(() => {
		onSwitchDirectionClickMock = jest.fn();
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should render as expected when conversion has not expired', () => {
		// When
		render(
			<ConversionResult
				from={{
					name: 'XXX',
					value: 12345,
				}}
				to={{
					name: 'YYY',
					value: 67890,
				}}
				onSwitchDirectionClick={onSwitchDirectionClickMock}
			/>
		);

		// Then
		expect(screen.getByRole('alert')).toBeInTheDocument();
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
					name: 'XXX',
					value: 12345,
				}}
				to={{
					name: 'YYY',
					value: 67890,
				}}
				onSwitchDirectionClick={onSwitchDirectionClickMock}
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
