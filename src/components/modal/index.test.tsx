import Modal from './index';
import { screen, render } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';

describe('Modal', () => {
	let onCloseMock: jest.Mock;

	beforeEach(() => {
		onCloseMock = jest.fn();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should render as expected', () => {
		// When
		render(<Modal />);

		// Then
		expect(screen.getByRole('dialog')).toBeInTheDocument();
	});
	it('should close when button clicked', () => {
		// Given
		render(<Modal />);
		expect(screen.getByRole('dialog')).toBeInTheDocument();

		// When
		fireEvent.click(screen.getByText('Close'));

		// Then
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	it('should close when button clicked', () => {
		// Given
		render(<Modal onClose={onCloseMock} />);

		// When
		fireEvent.click(screen.getByText('Close'));

		// Then
		expect(onCloseMock).toHaveBeenCalledTimes(1);
	});
});
