import styled from 'styled-components';
import { rem } from 'polished';

export const Overlay = styled.div`
	align-items: flex-start;
	background: rgba(0, 0, 0, 0.65);
	display: flex;
	height: 100%;
	justify-content: center;
	left: 0;
	position: absolute;
	top: 0;
	width: 100%;
	z-index: 1;
`;

export const Wrapper = styled.div`
	@keyframes grow {
		from {
			transform: scale(0);
		}
		to {
			transform: scale(1);
		}
	}

	animation-duration: 0.35s;
	animation-iteration-count: 1;
	animation-name: grow;
	animation-timing-function: linear;
	background: #f2f9ff;
	border-radius: ${rem(10)};
	box-shadow: 0 0 5px #000;
	font-weight: bold;
	height: auto;
	padding: ${rem(48)} ${rem(16)} ${rem(16)};
	position: relative;
	text-align: center;
	top: ${rem(32)};
	width: 90%;
	z-index: 2;

	@media screen and (prefers-reduced-motion: reduce) {
		animation-name: none;
	}
`;

export const CloseButton = styled.button`
	background: 0;
	border: 0;
	position: absolute;
	right: ${rem(16)};
	top: ${rem(16)};
`;
