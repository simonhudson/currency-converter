import styled from 'styled-components';
import { rem } from 'polished';

const HIDE_MODAL_AT_DEVICE_WIDTH = '768px';

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

	@media only screen and (min-width: ${HIDE_MODAL_AT_DEVICE_WIDTH}) {
		background: 0;
		position: static;
	}
`;

export const Wrapper = styled.div`
	background: #f2f9ff;
	border-radius: ${rem(10)};
	box-shadow: 0 0 5px #000;
	font-weight: bold;
	height: auto;
	padding: ${rem(32)} ${rem(16)} ${rem(16)};
	position: relative;
	text-align: center;
	top: ${rem(32)};
	width: 80%;
	z-index: 2;

	@media only screen and (min-width: ${HIDE_MODAL_AT_DEVICE_WIDTH}) {
		box-shadow: none;
		width: 100%;
	}
`;

export const CloseButton = styled.button`
	background: 0;
	border: 0;
	position: absolute;
	right: ${rem(10)};
	top: ${rem(10)};

	@media only screen and (min-width: ${HIDE_MODAL_AT_DEVICE_WIDTH}) {
		display: none;
	}
`;