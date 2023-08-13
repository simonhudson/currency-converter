import styled from 'styled-components';
import { rem } from 'polished';

export const Input = styled.input`
	border: none;
	border-radius: ${rem(5)};
	box-shadow: 0 0 5px #ddd;
	padding: ${rem(16)};
	width: 100%;

	&:focus {
		outline: none;
	}

	&:focus-visible {
		outline: default;
	}
`;

export const Label = styled.label`
	display: block;
	font-weight: bold;
	padding-bottom: ${rem(16)};
`;

export const LabelInfo = styled.span`
	display: block;
	font-size: ${rem(14)};
	font-weight: normal;
`;

export const ErrorMessage = styled.span`
	display: block;
	color: red;
	font-size: ${rem(14)};
	font-weight: normal;
`;

const ButtonCommon = styled.button`
	border: 0;
	border-radius: ${rem(5)};
	display: block;
	font-size: ${rem(16)};
	font-weight: bold;
	margin: ${rem(20)} auto;
	padding: ${rem(10)} ${rem(30)};
	text-align: center;
`;

export const Button = styled(ButtonCommon)`
	background: #0074cc;
	color: #fff;
`;

export const ButtonSecondary = styled(ButtonCommon)`
	background: #fff;
	border: 2px solid #0074cc;
	color: #0074cc;
`;
