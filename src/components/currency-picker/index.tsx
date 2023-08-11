'use client';

import React, { useRef, useState } from 'react';
import { Wrapper, Label, LabelInfo, Input, ResultsWrapper, ResultsList, ResultsItem } from './index.styles';
import AssistiveContent from './assistive-content';
import returnKeyPressed from '@/src/helpers/returnKeyPressed';

type TypeAheadProps = {
	dataSource: string[];
	inputId: string;
	label?: string;
	labelInfo?: string;
	minQueryLength?: number;
};

const CurrencyPicker = ({ dataSource, inputId, label, labelInfo, minQueryLength = 3 }: TypeAheadProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const resultsListRef = useRef<HTMLUListElement>(null);

	const [results, setResults] = useState<string[]>([]);
	const [selectedValue, setSelectedValue] = useState<string | null>(null);
	const [inputValue, setInputValue] = useState<string>('');

	const clearResults = (): void => setResults([]);
	const clearSelectedValue = (): void => setSelectedValue(null);

	const getInputValue = (): string => inputRef?.current?.value ?? '';
	const getInputValueLength = (): number => getInputValue().length;
	const getResultsLength = (): number => results?.length;

	const queryDataSource = (): void => {
		if (getInputValueLength() >= minQueryLength) {
			const queryResults: string[] = dataSource.filter((item) =>
				item.toLowerCase().includes(getInputValue().toLowerCase())
			);
			setResults(queryResults);
		} else {
			clearResults();
			clearSelectedValue();
		}
	};

	const selectValueFromList = (item: string): void => {
		setInputValue(item);
		setSelectedValue(item);
		clearResults();
	};

	return (
		<Wrapper>
			<AssistiveContent
				minQueryLength={minQueryLength}
				queryLength={getInputValueLength()}
				resultsLength={results.length}
				selectedValue={selectedValue}
			/>
			<Label htmlFor={inputId}>
				{label}
				{labelInfo && <LabelInfo>{labelInfo}</LabelInfo>}
			</Label>
			<Input
				aria-describedby="typeahead-assistive-hint"
				autoComplete="off"
				id={inputId}
				onChange={(e) => {
					setInputValue(e.target.value);
					queryDataSource();
				}}
				ref={inputRef}
				type="text"
				value={inputValue}
			/>
			{getInputValueLength() >= minQueryLength && !!getResultsLength() && (
				<ResultsWrapper>
					{!getResultsLength() && !selectedValue && <p>Sorry, no results for {getInputValue()}.</p>}
					{!!getResultsLength() && (
						<ResultsList ref={resultsListRef}>
							{results.map((item: string) => {
								const slug: string = item.toLowerCase().replace(/\s/g, '-');
								return (
									<ResultsItem
										key={`results-list--${slug}`}
										onClick={() => selectValueFromList(item)}
										onKeyUp={(e) => {
											if (returnKeyPressed(e)) selectValueFromList(item);
										}}
										tabIndex={0}
									>
										{item}
									</ResultsItem>
								);
							})}
						</ResultsList>
					)}
				</ResultsWrapper>
			)}
		</Wrapper>
	);
};

export default CurrencyPicker;
