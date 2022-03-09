import {truncate} from 'fs';
import {ComponentChildren} from 'preact';

import {Keys_Enum} from '#core/constants/key-codes';
import {mod} from '#core/math';
import {getValueForExpr} from '#core/types/object';
import {includes} from '#core/types/string';

import * as Preact from '#preact';
import {useCallback, useEffect, useMemo, useRef, useState} from '#preact';
import {ContainWrapper} from '#preact/component';

import fuzzysearch from '#third_party/fuzzysearch';

const filterTypes = [
  'substring',
  'prefix',
  'token-prefix',
  'fuzzy',
  'custom',
  'none',
] as const;

type FilterType = typeof filterTypes[number];

function isValidFilterType(filterType: any): filterType is FilterType {
  return filterTypes.includes(filterType);
}

type Item = string | object;
interface BentoAutocompleteProps {
  id?: string;
  onError?: (message: string) => void;
  children?: ComponentChildren;
  filter?: FilterType;
  minChars?: number;
  items?: Item[];
  filterValue?: string;
  maxItems?: number;
  highlightUserEntry?: boolean;
}

const DEFAULT_ON_ERROR = (message: string) => {
  throw new Error(message);
};

const TAG = 'bento-autocomplete';

/**
 * @param {!BentoAutocomplete.Props} props
 * @return {PreactDef.Renderable}
 */
export function BentoAutocomplete({
  id,
  children,
  onError = DEFAULT_ON_ERROR,
  filter = 'none',
  minChars = 1,
  items = [],
  filterValue = 'value',
  maxItems,
  highlightUserEntry = false,
}: BentoAutocompleteProps) {
  const elementRef = useRef<HTMLElement>(null);
  const containerId = useRef<string>(
    id || `${Math.floor(Math.random() * 100)}_AMP_content_`
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [data, setData] = useState<Item[]>(items);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const getItemId = useCallback(
    (index: number) => {
      return `${id}-${index}`;
    },
    [id]
  );

  const getSingleInputOrTextarea = useCallback(
    (element: HTMLElement) => {
      const possibleElements = element.querySelectorAll('input,textarea');
      if (possibleElements.length !== 1) {
        onError(
          `${TAG} should contain exactly one <input> or <textarea> descendant.`
        );
        return;
      }
      return possibleElements[0];
    },
    [onError]
  );

  const setupInputElement = useCallback(
    (element: HTMLElement) => {
      const inputElement = getSingleInputOrTextarea(element);
      if (inputElement) {
        if (inputElement.hasAttribute('type')) {
          const inputType = inputElement.getAttribute('type');
          if (inputType !== 'text' && inputType !== 'search') {
            onError(
              `${TAG} requires the "type" attribute to be "text" or "search" if present on <input>.`
            );
          }
        }
        inputElement.setAttribute('dir', 'auto');
        inputElement.setAttribute('aria-autocomplete', 'both');
        inputElement.setAttribute('aria-controls', containerId.current);
        inputElement.setAttribute('aria-haspopup', 'listbox');
        inputElement.setAttribute('aria-owns', containerId.current);
        inputElement.setAttribute('aria-expanded', 'false');
        if (inputElement.tagName === 'INPUT') {
          inputElement.setAttribute('role', 'combobox');
          inputElement.setAttribute('aria-multiline', 'false');
        } else {
          inputElement.setAttribute('role', 'textbox');
        }

        inputRef.current = inputElement as HTMLInputElement;
      }
    },
    [getSingleInputOrTextarea, onError]
  );

  const validateProps = useCallback(() => {
    if (!isValidFilterType(filter)) {
      onError(`Unexpected filter: ${filter}.`);
    }
  }, [filter, onError]);

  const showAutocompleteOptions = useMemo(() => {
    return (data?.length && inputValue.length >= minChars) || false;
  }, [data, inputValue, minChars]);

  const truncateToMaxItems = useCallback(
    (data: Item[]) => {
      if (maxItems && maxItems < data.length) {
        return data.slice(0, maxItems);
      }
      return data;
    },
    [maxItems]
  );

  const filteredData = useMemo(() => {
    if (filter === 'none') {
      return truncateToMaxItems(data);
    }

    const normalizedValue = inputValue.toLocaleLowerCase();

    const filteredData = data.filter((item: Item) => {
      if (typeof item === 'object') {
        item = getValueForExpr(item, filterValue);
      }
      if (typeof item !== 'string') {
        onError(
          `${TAG} data property "${filterValue}" must map to string type.`
        );
        // Return default value
        return;
      }
      item = item.toLocaleLowerCase();

      switch (filter) {
        case 'substring':
          return includes(item, normalizedValue);
        case 'prefix':
          return item.startsWith(normalizedValue);
        case 'token-prefix':
          // TODO
          return [];
        case 'fuzzy':
          return fuzzysearch(normalizedValue, item);
        case 'custom':
          throw new Error(`Filter not yet supported: ${filter}`);
        default:
          throw new Error(`Unexpected filter: ${filter}`);
      }
    });

    return truncateToMaxItems(filteredData);
  }, [data, filter, inputValue, filterValue, onError, truncateToMaxItems]);

  const handleInput = useCallback((event: Event) => {
    const _inputValue = (event.target as HTMLInputElement).value;

    // TODO: Use logic to derive this from the binding
    setInputValue(_inputValue);
  }, []);

  // const enabledItems = useMemo(() => {
  //   return containerRef.current?.querySelectorAll(
  //     '.i-amphtml-autocomplete-item:not([data-disabled])'
  //   );
  // }, []);

  const updateActiveItem = useCallback(
    (delta: number) => {
      // if (delta === 0 || !areResultsDisplayed || enabledItems.length === 0) {
      //   return;
      // }
      const index = activeIndex + delta;
      const newActiveIndex = mod(index, filteredData.length);
      const newValue = filteredData[newActiveIndex];

      setActiveIndex(newActiveIndex);
      inputRef.current?.setAttribute(
        'aria-activedescendant',
        getItemId(newActiveIndex)
      );

      inputRef.current!.value = newValue as string;
    },
    [activeIndex, filteredData, getItemId]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case Keys_Enum.DOWN_ARROW:
          event.preventDefault();
          if (showAutocompleteOptions) {
            if (activeIndex === filteredData.length - 1) {
              return;
            }
            updateActiveItem(1);
          }
      }
    },
    [showAutocompleteOptions, activeIndex, filteredData, updateActiveItem]
  );

  const getItemChildren = useCallback(
    (item: string) => {
      const lowerCaseItem = item.toLocaleLowerCase();
      const lowerCaseSubstring = inputValue.toLocaleLowerCase();
      if (
        highlightUserEntry &&
        inputValue.length &&
        inputValue.length <= item.length &&
        includes(lowerCaseItem, lowerCaseSubstring)
      ) {
        const substringStart = lowerCaseItem.indexOf(lowerCaseSubstring);
        const substringEnd = substringStart + lowerCaseSubstring.length;
        return (
          <>
            {item.slice(0, substringStart)}
            <span class="autocomplete-partial">
              {item.slice(substringStart, substringEnd)}
            </span>
            {item.slice(substringEnd, item.length)}
          </>
        );
      }
      return item;
    },
    [highlightUserEntry, inputValue]
  );

  useEffect(() => {
    setupInputElement(elementRef.current!);
    validateProps();

    inputRef.current?.addEventListener('input', handleInput);
    inputRef.current?.addEventListener('keydown', handleKeyDown);

    return () => {
      inputRef.current?.removeEventListener('input', handleInput);
      inputRef.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, [setupInputElement, validateProps, handleInput, handleKeyDown]);

  return (
    <ContainWrapper ref={elementRef}>
      {children}
      <div
        ref={containerRef}
        id={containerId.current}
        class="i-amphtml-autocomplete-results"
        role="listbox"
        hidden={!showAutocompleteOptions}
      >
        {filteredData.map((item: Item, index: number) => {
          if (typeof item === 'string') {
            return (
              <div
                key={item}
                data-value={item}
                id={getItemId(index)}
                class="i-amphtml-autocomplete-item"
                role="option"
                dir="auto"
                aria-selected={activeIndex === index}
              >
                {getItemChildren(item)}
              </div>
            );
          }
        })}
      </div>
    </ContainWrapper>
  );
}
