import React from 'react';
import AmountForm from './index';
import { screen, render } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';

describe('AmountForm', () => {
	it('should render as expected', () => {
		// When
		initialise();

		// Then
		expect(screen.getByLabelText('Amount')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Whole numbers only')).toBeInTheDocument();
	});

	describe('Input validation', () => {
		it('should not render error message for valid value', () => {
			// Given
			initialise();
			const input = screen.getByLabelText('Amount');
			expect(screen.queryByRole('alert')).not.toBeInTheDocument();

			// When
			fireEvent.change(input, { target: { value: '1234' } });
			fireEvent.blur(input);

			// Then
			expect(screen.queryByRole('alert')).not.toBeInTheDocument();
			expect(screen.queryByText('Error: Please enter a value in the "Amount" field.')).not.toBeInTheDocument();
			expect(
				screen.queryByText(
					'Error: 123.456 is not a valid number. Please enter whole numbers only, without decimals.'
				)
			).not.toBeInTheDocument();
		});

		it('should render error message for empty value', () => {
			// Given
			initialise();
			const input = screen.getByLabelText('Amount');
			expect(screen.queryByRole('alert')).not.toBeInTheDocument();

			// When
			fireEvent.change(input, { target: { value: '' } });
			fireEvent.blur(input);

			// Then
			expect(screen.getByRole('alert')).toBeInTheDocument();
			expect(screen.getByText('Error: Please enter a value in the "Amount" field.')).toBeInTheDocument();
		});
		it('should render error message for invalid value', () => {
			// Given
			initialise();
			const input = screen.getByLabelText('Amount');
			expect(screen.queryByRole('alert')).not.toBeInTheDocument();

			// When
			fireEvent.change(input, { target: { value: '123.456' } });
			fireEvent.blur(input);

			// Then
			expect(screen.getByRole('alert')).toBeInTheDocument();
			expect(
				screen.getByText(
					'Error: 123.456 is not a valid number. Please enter whole numbers only, without decimals.'
				)
			).toBeInTheDocument();
		});
	});

	const initialise = () => render(<AmountForm onValidInput={jest.fn()} />);
});
