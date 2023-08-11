'use client';

import React, { useRef, useState } from 'react';
import { Wrapper, Label, LabelInfo, Input, ResultsWrapper, ResultsList, ResultsItem } from './index.styles';
import AssistiveContent from './assistive-content';
import returnKeyPressed from '@/src/helpers/returnKeyPressed';

type Props = {
	dataSource: string[];
	inputId: string;
	isDisabled?: boolean;
	label: string;
	labelInfo?: string;
	minQueryLength?: number;
	placeholder?: string;
	showAllResultsOnFocus?: boolean;
};

const TypeAhead = ({
	dataSource,
	inputId,
	isDisabled,
	label,
	labelInfo,
	minQueryLength = 3,
	placeholder,
	showAllResultsOnFocus = true,
}: Props) => {
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
			<Label htmlFor={inputId} aria-disabled={isDisabled}>
				{label}
				{labelInfo && <LabelInfo>{labelInfo}</LabelInfo>}
			</Label>
			<Input
				aria-describedby="typeahead-assistive-hint"
				autoComplete="off"
				disabled={isDisabled}
				id={inputId}
				onChange={(e) => {
					setInputValue(e.target.value);
					queryDataSource();
				}}
				onFocus={() => (showAllResultsOnFocus ? setResults(dataSource) : null)}
				placeholder={`${placeholder ? placeholder : null}`}
				ref={inputRef}
				type="text"
				value={inputValue}
			/>
			{!!getResultsLength() && (
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

export default TypeAhead;
