import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class Layout extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta name="description" content="" />
					<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
				</Head>
				<body id="top">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default Layout;
