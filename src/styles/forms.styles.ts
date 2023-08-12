import styled, { css } from 'styled-components';
import { rem } from 'polished';

export const Input = styled.input`
	border: none;
	border-radius: ${rem(5)};
	box-shadow: 0 0 5px #ddd;
	font-size: ${rem(22)};
	padding: ${rem(10)};
	width: 100%;

	&:focus {
		outline: none;
	}

	&:focus-visible {
		outline: default;
	}
`;

export const Label = styled.label`
	font-weight: bold;
`;

export const LabelInfo = styled.span`
	display: block;
	font-weight: normal;
`;

export const ErrorMessage = styled.span`
	display: block;
	color: red;
	font-size: ${rem(10)};
	font-weight: normal;
`;

export const Button = styled.button`
	background: #0074cc;
	border: 0;
	border-radius: ${rem(5)};
	color: #fff;
	display: block;
	font-size: ${rem(16)};
	font-weight: bold;
	margin: ${rem(20)} auto;
	padding: ${rem(10)} ${rem(30)};
	text-align: center;
`;
