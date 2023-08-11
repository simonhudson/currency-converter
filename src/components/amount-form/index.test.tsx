import React from 'react';
import Form from './index';
import { screen, render } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';

describe('Form', () => {
	it('should render as expected', () => {
		// When
		render(<Form />);

		// Then
		expect(screen.getByRole('form')).toBeInTheDocument();
		expect(screen.getByLabelText('Amount')).toBeInTheDocument();
	});

	describe('Input validation', () => {
		it('should render error message for empty value', () => {
			// Given
			render(<Form />);
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
			render(<Form />);
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
