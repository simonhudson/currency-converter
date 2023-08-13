import styled from 'styled-components';
import { rem } from 'polished';
import media from '@/src/styles/media-queries';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${rem(20)};
	padding-top: ${rem(20)};

	${media.tabletLandscape(`
		flex-direction: row;
	`)};
`;

export const ElementWrapper = styled.div`
	width: 100%;

	${media.tabletLandscape(`
		width: 50%;
	`)};
`;
