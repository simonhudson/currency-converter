import { StyledSvg } from './index.styles';
import { ButtonSecondary } from '@/src/styles/forms.styles';
import type { SwitchDirectionProps } from './index.d';

const SwitchDirection = ({ onClick }: SwitchDirectionProps) => {
	return (
		<ButtonSecondary onClick={() => onClick()}>
			<StyledSvg
				aria-label="Switch currency conversion direction"
				viewBox="0 0 21 21"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g
					fill="none"
					fillRule="evenodd"
					stroke="#0074cc"
					strokeLinecap="round"
					strokeLinejoin="round"
					transform="translate(4 2)"
				>
					<path d="m4.5 8.5-4 4 4 4" />
					<path d="m12.5 12.5h-12" />
					<path d="m8.5.5 4 4-4 4" />
					<path d="m12.5 4.5h-12" />
				</g>
			</StyledSvg>
			Switch conversion direction
		</ButtonSecondary>
	);
};

export default SwitchDirection;
