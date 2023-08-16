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
			<CurrencyPicker
				dataSource={[
					{ name: 'Foo', code: 'FOO', imgUrl: 'http://Foo-img' },
					{ name: 'Bar', code: 'BAR', imgUrl: 'http://Bar-img' },
					{ name: 'Lorem', code: 'LOR', imgUrl: 'http://Lorem-img' },
					{ name: 'Ipsum', code: 'IPS', imgUrl: 'http://Ipsum-img' },
					{ name: 'Foobar', code: 'FOB', imgUrl: 'http://Foobar-img' },
				]}
				fromInputRef={fromInputRef}
				toInputRef={toInputRef}
			/>
		);

		// Then
		expect(screen.getByLabelText('From')).toBeInTheDocument();
		expect(screen.getByLabelText('To')).toBeInTheDocument();
		expect(screen.getAllByPlaceholderText('Type 3 or more characters to see suggestions').length).toEqual(2);
	});
});
