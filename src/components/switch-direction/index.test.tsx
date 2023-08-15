import React from 'react';
import SwitchDirection from './index';
import { screen, render, act } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';

describe('SwitchDirection', () => {
	let onClickMock: jest.Mock;

	beforeEach(() => {
		onClickMock = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should render as expected', () => {
		// When
		initialise();

		// Then
		expect(screen.getByLabelText('Switch currency conversion direction')).toBeInTheDocument();
	});

	it('should call function when clicked', () => {
		// Given
		initialise();
		expect(screen.getByLabelText('Switch currency conversion direction')).toBeInTheDocument();

		// When
		act(() => fireEvent.click(screen.getByText('Switch conversion direction')));

		// Then
		expect(onClickMock).toHaveBeenCalledTimes(1);
	});

	const initialise = () => render(<SwitchDirection onClick={onClickMock} />);
});
