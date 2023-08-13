import styled, { css } from 'styled-components';
import { rem } from 'polished';

export const Paragraph = styled.p`
	font-size: ${rem(22)};

	&:first-of-type {
		margin-bottom: ${rem(10)};
		span {
			display: block;
		}
	}

	&:nth-of-type(2) {
		font-size: ${rem(18)};
		font-weight: normal;
	}
`;
