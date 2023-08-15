import { createRef } from 'react';
import CurrencyPicker from './index';
import { screen, render } from '@testing-library/react';

describe('CurrencyPicker', () => {
	it('should render as expected', () => {
		// Given
		const fromInputRef = createRef<HTMLInputElement>();
		const toInputRef = createRef<HTMLInputElement>();

		// When
		render(
			<CurrencyPicker dataSource={['foo', 'bar', 'lorem']} fromInputRef={fromInputRef} toInputRef={toInputRef} />
		);

		// Then
		expect(screen.getByLabelText('From')).toBeInTheDocument();
		expect(screen.getByLabelText('To')).toBeInTheDocument();
		expect(screen.getAllByPlaceholderText('Type 3 or more characters to see suggestions').length).toEqual(2);
	});
});
