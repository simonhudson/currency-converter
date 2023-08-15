import React from 'react';
import AssistiveContent from './assistive-content';
import { screen, render } from '@testing-library/react';
import { cloneDeep } from 'lodash';
import type { AssistiveContentProps } from './assistive-content.d';

const baseProps: AssistiveContentProps = {
	inputId: 'input-id',
	minQueryLength: 3,
	noResultsFound: false,
	queryLength: 0,
	resultsLength: 0,
	selectedValue: '',
};

describe('AssistiveContent', () => {
	it('should render as expected on initial load', () => {
		// Given
		const props = cloneDeep(baseProps);

		// When
		initialise(props);

		// Then
		expect(
			screen.getByText(
				'When autocomplete results are available use tab key to review and enter to select. Touch device users, explore by touch or with swipe gestures.'
			)
		).toBeInTheDocument();
		expect(screen.queryByRole('status')).not.toBeInTheDocument();
	});

	it('should render as expected when query is too short', () => {
		// Given
		const props = cloneDeep(baseProps);
		props.queryLength = 2;

		// When
		initialise(props);

		// Then
		expect(screen.getByRole('status')).toBeInTheDocument();
		expect(screen.getByText('Type in 3 or more characters for results')).toBeInTheDocument();
	});

	it('should render as expected when there are no results', () => {
		// Given
		const props = cloneDeep(baseProps);
		props.queryLength = 3;
		props.noResultsFound = true;

		// When
		initialise(props);

		// Then
		expect(screen.getByRole('status')).toBeInTheDocument();
		expect(screen.getByText('No results found')).toBeInTheDocument();
	});

	it('should render as expected when there are multiple results', () => {
		// Given
		const props = cloneDeep(baseProps);
		props.queryLength = 3;
		props.resultsLength = 10;

		// When
		initialise(props);

		// Then
		expect(screen.getByRole('status')).toBeInTheDocument();
		expect(screen.getByText('10 results are available')).toBeInTheDocument();
	});

	it('should render as expected when there is a single result', () => {
		// Given
		const props = cloneDeep(baseProps);
		props.queryLength = 3;
		props.resultsLength = 1;

		// When
		initialise(props);

		// Then
		expect(screen.getByRole('status')).toBeInTheDocument();
		expect(screen.getByText('1 result is available')).toBeInTheDocument();
	});

	it('should render as expected when a result is selected', () => {
		// Given
		const props = cloneDeep(baseProps);
		props.selectedValue = 'Foo';

		// When
		initialise(props);

		// Then
		expect(screen.getByRole('status')).toBeInTheDocument();
		expect(screen.getByText('You have selected Foo')).toBeInTheDocument();
	});

	const initialise = (props: AssistiveContentProps) => render(<AssistiveContent {...props} />);
});
