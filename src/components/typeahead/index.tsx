import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { Label, LabelInfo, Input } from '@/src/styles/forms.styles';
import { Wrapper, ResultsWrapper, ResultsList, ResultsItem } from './index.styles';
import AssistiveContent from './assistive-content';
import returnKeyPressed from '@/src/helpers/returnKeyPressed';
import { NO_RESULTS_STRING } from './constants';
import type { TypeAheadProps } from './index.d';

const TypeAhead = forwardRef<HTMLInputElement, TypeAheadProps>(
	(
		{
			dataSource,
			inputId,
			label,
			labelInfo,
			minQueryLength = 3,
			placeholder,
			showAllResultsOnFocus = true,
		}: TypeAheadProps,
		ref
	) => {
		const resultsListRef = useRef<HTMLUListElement>(null);

		const [results, setResults] = useState<string[]>([]);
		const [selectedValue, setSelectedValue] = useState<string | null>(null);
		const [inputValue, setInputValue] = useState<string>('');

		useEffect(() => {
			window.addEventListener('click', clearResults);
		}, []);

		const clearResults = (): void => setResults([]);
		const clearSelectedValue = (): void => setSelectedValue(null);

		const getInputValue = (): string => (!!ref && typeof ref !== 'function' ? ref?.current?.value ?? '' : '');
		const getInputValueLength = (): number => getInputValue().length;
		const getResultsLength = (): number => results?.length;

		const queryDataSource = (): void => {
			if (getInputValueLength() >= minQueryLength) {
				const queryResults: string[] = dataSource.filter((item) =>
					item.toLowerCase().includes(getInputValue().toLowerCase())
				);

				if (queryResults.length < 1) setResults([NO_RESULTS_STRING]);
				else setResults(queryResults);
			} else {
				clearResults();
				clearSelectedValue();
			}
		};

		const selectValueFromList = (item: string): void => {
			if (item !== NO_RESULTS_STRING) {
				setInputValue(item);
				setSelectedValue(item);
				clearResults();
			}
		};

		return (
			<Wrapper onClick={(e) => e.stopPropagation()}>
				<AssistiveContent
					minQueryLength={minQueryLength}
					queryLength={getInputValueLength()}
					resultsLength={results.length}
					noResultsFound={results.length === 1 && results[0] === NO_RESULTS_STRING}
					selectedValue={selectedValue}
					inputId={inputId}
				/>
				<Label htmlFor={inputId}>
					{label}
					{labelInfo && <LabelInfo>{labelInfo}</LabelInfo>}
				</Label>
				<Input
					aria-describedby={`typeahead-assistive-hint--${inputId}`}
					autoComplete="off"
					id={inputId}
					onChange={(e) => {
						setInputValue(e.target.value);
						queryDataSource();
					}}
					onFocus={() => (showAllResultsOnFocus ? setResults(dataSource) : null)}
					placeholder={`${
						placeholder ? placeholder : `Type ${minQueryLength} or more characters to see suggestions`
					}`}
					ref={ref}
					type="text"
					value={inputValue}
				/>
				{!!getResultsLength() && (
					<ResultsWrapper>
						{!getResultsLength() && !selectedValue && <p>Sorry, no results for {getInputValue()}.</p>}
						{!!getResultsLength() && (
							<ResultsList ref={resultsListRef} role="listbox">
								{results.map((item: string) => {
									const slug: string = item.toLowerCase().replace(/\s/g, '-');
									return (
										<ResultsItem
											key={`results-list--${slug}`}
											onClick={(e) => selectValueFromList(item)}
											onKeyUp={(e) => {
												if (returnKeyPressed(e)) selectValueFromList(item);
											}}
											tabIndex={0}
											role="listitem"
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
	}
);

TypeAhead.displayName = 'TypeAhead';

export default TypeAhead;
