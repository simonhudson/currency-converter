import React, { useEffect, useState } from 'react';
import debounce from '@/src/helpers/debounce';
import styled from 'styled-components';

type AssistiveContentProps = {
	minQueryLength: number;
	queryLength: number;
	resultsLength: number;
	selectedValue: string | null;
};

const VisuallyHidden = styled.div`
	color: #fff;
	overflow: hidden;
	position: absolute;
	clip: rect(0 0 0 0);
	height: 1px;
	width: 1px;
	margin: -1px;
	padding: 0;
	border: 0;
`;

const AssistiveContent = ({ minQueryLength, queryLength, resultsLength, selectedValue }: AssistiveContentProps) => {
	const QUERY_TOO_SHORT: boolean = queryLength > 0 && queryLength < minQueryLength;
	const NO_RESULTS: boolean = resultsLength === 0;

	const [content, setContent] = useState<string | null>(null);

	const updateStatus = debounce(() => {
		let contentString: string = '';
		if (selectedValue) {
			contentString = `You have selected ${selectedValue}`;
		} else if (QUERY_TOO_SHORT) {
			contentString = `Type in ${minQueryLength} or more characters for results`;
		} else if (queryLength >= minQueryLength) {
			if (NO_RESULTS) {
				contentString = 'No search results';
			} else {
				contentString = `${resultsLength} ${resultsLength === 1 ? 'result' : 'results'} ${
					resultsLength === 1 ? 'is' : 'are'
				} available`;
			}
		}
		setContent(contentString);
	}, 500);

	useEffect(() => {
		updateStatus();
	});

	return (
		<VisuallyHidden>
			<p id="typeahead-assistive-hint">
				When autocomplete results are available use tab key to review and enter to select. Touch device users,
				explore by touch or with swipe gestures.
			</p>
			<p role="status">{content}</p>
		</VisuallyHidden>
	);
};

export default AssistiveContent;
