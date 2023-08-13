import breakpoints from './breakpoints';

const applyStyles = (viewportWidth: number, styles: string): string =>
	`@media (min-width: ${viewportWidth}px) { ${styles} }`;

type Media = {
	phonePortrait: (styles: string) => string;
	phoneLandscape: (styles: string) => string;
	tabletPortrait: (styles: string) => string;
	tabletLandscape: (styles: string) => string;
	desktop: (styles: string) => string;
};

const media: Media = {
	phonePortrait: (styles) => applyStyles(breakpoints['phone-p'], styles),
	phoneLandscape: (styles) => applyStyles(breakpoints['phone-l'], styles),
	tabletPortrait: (styles) => applyStyles(breakpoints['tablet-p'], styles),
	tabletLandscape: (styles) => applyStyles(breakpoints['tablet-l'], styles),
	desktop: (styles) => applyStyles(breakpoints.desktop, styles),
};

export default media;
