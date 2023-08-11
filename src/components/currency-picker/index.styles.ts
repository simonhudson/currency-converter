import styled from 'styled-components';
import { rem } from 'polished';

const BORDER = '1px solid #aaa';

export const Wrapper = styled.div`
	position: relative;
`;

export const Label = styled.label`
	display: block;
	font-weight: bold;
	margin-bottom: ${rem(10)};
`;

export const LabelInfo = styled.span`
	display: block;
	font-weight: normal;
	margin-top: ${rem(7)};
`;

export const Input = styled.input`
	border: ${BORDER};
	padding: ${rem(10)};
`;

export const ResultsWrapper = styled.div`
	background: #ffffff;
	border: ${BORDER};
	bottom: calc(0 - 100%);
	left: 0;
	position: absolute;
	width: 100%;
`;

export const ResultsList = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
`;

export const ResultsItem = styled.li`
	border-bottom: ${BORDER};
	margin: 0;
	padding: ${rem(10)};

	&:last-of-type {
		border-bottom: none;
	}

	&:hover,
	&:focus {
		background: #ddd;
	}
`;
