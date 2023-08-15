import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { NO_RESULTS_STRING } from './constants';
import type { AssistiveContentProps } from './assistive-content.d';

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

const AssistiveContent = ({
	inputId,
	minQueryLength,
	noResultsFound,
	queryLength,
	resultsLength,
	selectedValue,
}: AssistiveContentProps) => {
	const QUERY_TOO_SHORT: boolean = queryLength > 0 && queryLength < minQueryLength;
	const NO_RESULTS: boolean = noResultsFound;

	const [content, setContent] = useState<string | null>(null);

	const updateStatus = useCallback(() => {
		let contentString: string = '';
		if (selectedValue) {
			contentString = `You have selected ${selectedValue}`;
		} else if (QUERY_TOO_SHORT) {
			contentString = `Type in ${minQueryLength} or more characters for results`;
		} else if (queryLength >= minQueryLength) {
			if (NO_RESULTS) {
				contentString = NO_RESULTS_STRING;
			} else {
				contentString = `${resultsLength} ${resultsLength === 1 ? 'result' : 'results'} ${
					resultsLength === 1 ? 'is' : 'are'
				} available`;
			}
		}
		setContent(contentString);
	}, [NO_RESULTS, QUERY_TOO_SHORT, minQueryLength, queryLength, resultsLength, selectedValue]);

	useEffect(() => {
		updateStatus();
	}, [queryLength, updateStatus]);

	return (
		<VisuallyHidden>
			<p id={`typeahead-assistive-hint--${inputId}`}>
				When autocomplete results are available use tab key to review and enter to select. Touch device users,
				explore by touch or with swipe gestures.
			</p>
			{!!content && <p role="status">{content}</p>}
		</VisuallyHidden>
	);
};

export default AssistiveContent;
