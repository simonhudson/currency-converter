import { useState, ReactNode } from 'react';
import { Overlay, Wrapper, CloseButton } from './index.styles';

type Props = {
	children?: ReactNode;
};

const Modal = ({ children }: Props) => {
	const [hideModal, setHideModal] = useState<boolean>(false);

	return (
		<>
			{!hideModal ? (
				<Overlay>
					<Wrapper aria-modal="true" role="dialog">
						<CloseButton onClick={() => setHideModal(true)}>Close</CloseButton>
						{children}
					</Wrapper>
				</Overlay>
			) : null}
		</>
	);
};

export default Modal;
