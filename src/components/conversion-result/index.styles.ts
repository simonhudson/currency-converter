import styled from 'styled-components';
import { rem } from 'polished';
import Image from 'next/image';

export const Paragraph = styled.p`
	font-size: ${rem(22)};

	&:first-of-type {
		margin-bottom: ${rem(10)};

		span {
			display: block;
			font-weight: normal;
		}
	}

	&:nth-of-type(2) {
		font-size: ${rem(18)};
		font-weight: normal;
	}
`;

export const StyledImage = styled(Image)`
	margin-right: ${rem(5)};
`;
