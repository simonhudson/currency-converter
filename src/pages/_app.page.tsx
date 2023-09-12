import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import '@/src/styles/reset.css';
import styled, { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import media from '@/src/styles/media-queries';

const AppWrapper = styled.div`
	height: 100vh;
	margin: 0 auto;
	padding: 20px 0;
	width: 80%;

	${media.tabletPortrait(`
		width: 50%;
	`)}
`;

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<StyleSheetManager shouldForwardProp={isPropValid}>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<title>Currency Converter</title>
			</Head>
			<AppWrapper>
				<main>
					<Component {...pageProps} />
				</main>
			</AppWrapper>
		</StyleSheetManager>
	);
};

export default App;
