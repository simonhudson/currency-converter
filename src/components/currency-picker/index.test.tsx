import CurrencyPicker from './index';
import { screen, render } from '@testing-library/react';

describe('CurrencyPicker', () => {
	it('should render as expected', () => {
		// When
		render(<CurrencyPicker dataSource={['foo', 'bar', 'lorem']} onItemSelect={jest.fn()} />);

		// Then
		expect(screen.getByLabelText('From')).toBeInTheDocument();
		expect(screen.getByLabelText('To')).toBeInTheDocument();
		expect(screen.getAllByPlaceholderText('Search currency').length).toEqual(2);
	});
});
