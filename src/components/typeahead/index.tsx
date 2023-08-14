import React, { BaseSyntheticEvent, useEffect, useRef, useState, forwardRef } from 'react';
import { Label, LabelInfo, Input } from '@/src/styles/forms.styles';
import { Wrapper, ResultsWrapper, ResultsList, ResultsItem } from './index.styles';
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

const TypeAhead = forwardRef(
	(
		{
			dataSource,
			inputId,
			isDisabled,
			label,
			labelInfo,
			minQueryLength = 3,
			placeholder,
			showAllResultsOnFocus = true,
		}: Props,
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

		const getInputValue = (): string => ref?.current?.value ?? '';
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

		const selectValueFromList = (item: string, e: BaseSyntheticEvent): void => {
			setInputValue(item);
			setSelectedValue(item);
			clearResults();
		};

		return (
			<Wrapper onClick={(e) => e.stopPropagation()}>
				<AssistiveContent
					minQueryLength={minQueryLength}
					queryLength={getInputValueLength()}
					resultsLength={results.length}
					selectedValue={selectedValue}
					inputId={inputId}
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
							<ResultsList ref={resultsListRef}>
								{results.map((item: string) => {
									const slug: string = item.toLowerCase().replace(/\s/g, '-');
									return (
										<ResultsItem
											key={`results-list--${slug}`}
											onClick={(e) => selectValueFromList(item, e)}
											onKeyUp={(e) => {
												if (returnKeyPressed(e)) selectValueFromList(item, e);
											}}
											tabIndex={0}
											data-input-id={inputId}
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
