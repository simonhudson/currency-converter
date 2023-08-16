import React, { useEffect, useRef, useState, forwardRef } from 'react';
import Image from 'next/image';
import { Label, LabelInfo, Input } from '@/src/styles/forms.styles';
import { Wrapper, ResultsWrapper, ResultsList, ResultsItem } from './index.styles';
import AssistiveContent from './assistive-content';
import returnKeyPressed from '@/src/helpers/returnKeyPressed';
import { NO_RESULTS_STRING } from './constants';
import type { TypeAheadProps } from './index.d';
import type { CurrencyItem } from '@/src/types/currency.d';

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

		const [results, setResults] = useState<CurrencyItem[]>([]);
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
				const queryResults: CurrencyItem[] = dataSource.filter(
					(item) =>
						item.name.toLowerCase().includes(getInputValue().toLowerCase()) ||
						item?.code?.toLowerCase().includes(getInputValue().toLowerCase())
				);

				if (queryResults.length < 1) setResults([{ name: NO_RESULTS_STRING }]);
				else setResults(queryResults);
			} else {
				clearResults();
				clearSelectedValue();
			}
		};

		const selectValueFromList = (item: string | undefined): void => {
			if (item && item !== NO_RESULTS_STRING) {
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
					noResultsFound={results.length === 1 && results[0].name === NO_RESULTS_STRING}
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
						{!!getResultsLength() && (
							<ResultsList ref={resultsListRef} role="listbox">
								{results.map((item: CurrencyItem) => {
									if (item.name) {
										const slug: string = item.name.toLowerCase().replace(/\s/g, '-');
										return (
											<ResultsItem
												key={`results-list--${slug}`}
												onClick={(e) => selectValueFromList(item.name)}
												onKeyUp={(e) => {
													if (returnKeyPressed(e)) selectValueFromList(item.name);
												}}
												tabIndex={0}
												role="listitem"
											>
												{item.imgUrl && (
													<Image alt="" src={item.imgUrl} width="24" height="18" />
												)}
												&nbsp;
												{item.name}
											</ResultsItem>
										);
									}
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
