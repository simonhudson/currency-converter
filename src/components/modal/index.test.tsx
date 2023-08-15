import Modal from './index';
import { screen, render, fireEvent } from '@testing-library/react';

describe('Modal', () => {
	it('should render as expected', () => {
		// When
		render(<Modal />);

		// Then
		expect(screen.getByRole('dialog')).toBeInTheDocument();
	});
	it('should render children', () => {
		// Given
		const child = <p>Hello world!</p>;

		// When
		render(<Modal>{child}</Modal>);

		// Then
		expect(screen.getByText('Hello world!')).toBeInTheDocument();
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
});
