import { useState } from 'react';
import { Overlay, Wrapper, CloseButton } from './index.styles';

const Modal = ({ children }) => {
	const [hideModal, setHideModal] = useState<boolean>(false);

	return (
		<>
			{!hideModal ? (
				<Overlay>
					<Wrapper>
						<CloseButton onClick={() => setHideModal(true)}>Close</CloseButton>
						{children}
					</Wrapper>
				</Overlay>
			) : null}
		</>
	);
};

export default Modal;
