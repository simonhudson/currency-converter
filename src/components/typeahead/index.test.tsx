import React, { createRef } from 'react';
import TypeAhead from './index';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { cloneDeep } from 'lodash';
import type { TypeAheadProps } from './index.d';

const baseProps: TypeAheadProps = {
	dataSource: [
		{ name: 'Foo', code: 'FOO', imgUrl: 'http://Foo-img' },
		{ name: 'Bar', code: 'BAR', imgUrl: 'http://Bar-img' },
		{ name: 'Lorem', code: 'LOR', imgUrl: 'http://Lorem-img' },
		{ name: 'Ipsum', code: 'IPS', imgUrl: 'http://Ipsum-img' },
		{ name: 'Foobar', code: 'FOB', imgUrl: 'http://Foobar-img' },
	],
	inputId: 'input-id',
	label: 'Some label',
	labelInfo: '',
	minQueryLength: 3,
	placeholder: 'Some placeholder',
	showAllResultsOnFocus: true,
};

describe('TypeAhead', () => {
	it('should render as expected on initial load', () => {
		// Given
		const props = cloneDeep(baseProps);

		// When
		initialise(props);

		// Then
		expect(screen.getByLabelText('Some label')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Some placeholder')).toBeInTheDocument();
	});

	it('should render label info', () => {
		// Given
		const props = cloneDeep(baseProps);
		props.labelInfo = 'Some label info';

		// When
		initialise(props);

		// Then
		expect(screen.getByText('Some label info')).toBeInTheDocument();
	});

	it('should render results', () => {
		// Given
		const props = cloneDeep(baseProps);
		initialise(props);

		// When
		fireEvent.change(screen.getByLabelText('Some label'), { target: { value: 'foo' } });

		// Then
		waitFor(() => {
			const listItems = screen.getAllByRole('listitem');
			expect(screen.getByRole('listbox')).toBeInTheDocument();
			expect(listItems).toBeInTheDocument();
			expect(listItems.length).toEqual(2);
			expect(listItems[0]).toHaveTextContent('Foo');
			expect(listItems[1]).toHaveTextContent('Foobar');
		});
	});

	it('should render message when no results found', () => {
		// Given
		const props = cloneDeep(baseProps);
		initialise(props);

		// When
		fireEvent.change(screen.getByLabelText('Some label'), { target: { value: 'xxx' } });

		// Then
		waitFor(() => {
			const listItems = screen.getAllByRole('listitem');
			expect(screen.getByRole('listbox')).toBeInTheDocument();
			expect(listItems).toBeInTheDocument();
			expect(listItems.length).toEqual(1);
			expect(listItems[0]).toHaveTextContent('No results found');
		});
	});

	it('should populate field when result is selected', () => {
		// Given
		const props = cloneDeep(baseProps);
		initialise(props);
		fireEvent.change(screen.getByLabelText('Some label'), { target: { value: 'foo' } });

		// When
		fireEvent.click(screen.getByText('Foo'));

		// Then
		expect(screen.getByDisplayValue('Foo')).toBeInTheDocument();
	});

	const initialise = (props: TypeAheadProps) => {
		const ref = createRef<HTMLInputElement>();
		render(<TypeAhead {...props} ref={ref} />);
	};
});
