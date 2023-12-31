import styled from 'styled-components';
import { rem } from 'polished';

export const Wrapper = styled.div`
	position: relative;
`;

export const ResultsWrapper = styled.div`
	background: #ffffff;
	border-radius: ${rem(5)};
	border: none;
	bottom: calc(0 - 100%);
	box-shadow: 0 0 5px #ddd;
	left: 0;
	max-height: 300px;
	overflow: auto;
	position: absolute;
	width: 100%;
	z-index: 1;
`;

export const ResultsList = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
`;

export const ResultsItem = styled.li`
	border-bottom: 1px solid #ddd;
	margin: 0;
	padding: ${rem(10)};

	&:last-of-type {
		border-bottom: none;
	}

	&:hover,
	&:focus {
		background-color: #f2f9ff;
		outline: 0;
	}

	&:focus-visible {
		text-decoration: underline;
	}
`;
