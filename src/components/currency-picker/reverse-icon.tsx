import { StyledSvg } from './reverse-icon.styles';

const ReverseIcon = () => {
	return (
		<StyledSvg
			aria-label="Reverse currency conversion direction"
			viewBox="0 0 21 21"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g
				fill="none"
				fill-rule="evenodd"
				stroke="#fff"
				stroke-linecap="round"
				stroke-linejoin="round"
				transform="translate(4 2)"
			>
				<path d="m4.5 8.5-4 4 4 4" />
				<path d="m12.5 12.5h-12" />
				<path d="m8.5.5 4 4-4 4" />
				<path d="m12.5 4.5h-12" />
			</g>
		</StyledSvg>
	);
};

export default ReverseIcon;