import styled from 'styled-components';
import { rem } from 'polished';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${rem(20)};
	padding-top: ${rem(20)};

	@media only screen and (min-width: 800px) {
		flex-direction: row;
	}
`;

export const ElementWrapper = styled.div`
	width: 100%;

	@media only screen and (min-width: 800px) {
		width: 50%;
	}
`;
