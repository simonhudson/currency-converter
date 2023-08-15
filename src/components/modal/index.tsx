import { useState } from 'react';
import { Overlay, Wrapper, CloseButton } from './index.styles';
import type { ModalProps } from './index.d';

const Modal = ({ children }: ModalProps) => {
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
