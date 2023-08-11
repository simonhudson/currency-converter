import styled, { css } from 'styled-components';
import { rem } from 'polished';

export const Form = styled.form`
	font-size: ${rem(24)};
`;

export const Label = styled.label`
	display: block;
`;

export const Input = styled.input`
	border: none;
	border-bottom: 3px solid #5d5d5d;
	color: #0072d0;
	font-size: ${rem(24)};
	font-weight: bold;
	padding: ${rem(20)} ${rem(10)};
	width: 100%;

	&:focus {
		border-bottom: 3px solid #0072d0;
		outline: none;
	}
`;

export const ErrorMessage = styled.p`
	color: red;
	font-weight: bold;
`;
