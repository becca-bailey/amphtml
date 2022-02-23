import {addDays} from 'date-fns';
// eslint-disable-next-line local/no-import
import {ComponentProps} from 'preact';

import {
  closestAncestorElementBySelector,
  querySelectorInSlot,
  scopedQuerySelector,
} from '#core/dom/query';

import * as Preact from '#preact';
import {useCallback, useMemo, useRef, useState} from '#preact';

import {useDatePickerContext} from './use-date-picker-context';

import {DateFieldNameByType, FORM_INPUT_SELECTOR, TAG} from '../constants';
import {getFormattedDate} from '../date-helpers';
import {parseDate as _parseDate} from '../parsers';
import {DateFieldType} from '../types';

interface DatePickerInputProps {
  inputSelector: string;
  type: DateFieldType;
}

/**
 * Baseline functions for a date input field
 */
export function useDatePickerInput({
  inputSelector,
  type,
}: DatePickerInputProps) {
  const {
    format,
    id,
    locale,
    mode,
    onError,
    today,
    type: datePickerType,
  } = useDatePickerContext();

  const ref = useRef<HTMLInputElement>(null);

  const [date, setDate] = useState<Date>();
  const [hiddenInputProps, setHiddenInputProps] =
    useState<ComponentProps<'input'>>();

  const formatDate = useCallback(
    (date: Date) => getFormattedDate(date, format, locale),
    [format, locale]
  );

  const parseDate = useCallback(
    (value: string) => _parseDate(value, format, locale),
    [format, locale]
  );

  const handleSetDate = useCallback(
    (date: Date) => {
      setDate(date);
      if (ref.current) {
        ref.current.value = formatDate(date);
      }
    },
    [formatDate]
  );

  /**
   * Resets the date and input value
   */
  const clear = useCallback(() => {
    setDate(undefined);
    if (ref.current) {
      ref.current.value = '';
    }
  }, []);

  /**
   * Sets the date to today (with an optional offset property)
   */
  const setToToday = useCallback(
    (offset = 0) => {
      const todayWithOffset = addDays(today, offset);
      handleSetDate(todayWithOffset);
    },
    [handleSetDate, today]
  );

  const hiddenInputComponent = useMemo(() => {
    if (!hiddenInputProps) {
      return null;
    }
    return <input ref={ref} {...hiddenInputProps} />;
  }, [hiddenInputProps]);

  /**
   * Generate a name for a hidden input.
   * Date pickers not in a form don't need named hidden inputs.
   */
  const getHiddenInputId = useCallback(
    (form: HTMLFormElement) => {
      const name: string = DateFieldNameByType.get(type)!;
      if (!form) {
        return '';
      }

      if (!form.elements.namedItem(name)) {
        return name;
      }

      const alternativeName = `${id}-${name}`;
      if (id && !form.elements.namedItem(alternativeName)) {
        return alternativeName;
      }

      onError(
        `Multiple date-pickers with implicit ${TAG} fields need to have IDs`
      );

      return '';
    },
    [onError, id, type]
  );

  const getInputElement = useCallback(
    (containerEl: HTMLElement) => {
      let inputElement: HTMLInputElement | null;

      inputElement = scopedQuerySelector(
        containerEl,
        inputSelector
      ) as HTMLInputElement;

      // This is required for bento mode
      if (!inputElement) {
        const slot = containerEl.querySelector('slot');
        if (slot) {
          inputElement = querySelectorInSlot(
            slot,
            inputSelector
          ) as HTMLInputElement;
        }
      }

      return inputElement;
    },
    [inputSelector]
  );

  const initialize = useCallback(
    (containerEl: HTMLElement) => {
      const form = closestAncestorElementBySelector(
        containerEl,
        FORM_INPUT_SELECTOR
      ) as HTMLFormElement;

      const inputElement = getInputElement(containerEl);

      if (mode === 'overlay' && !inputElement) {
        const message =
          datePickerType === 'range'
            ? `Overlay range pickers must specify "startInputSelector" and "endInputSelector"`
            : `Overlay single pickers must specify "inputSelector"`;
        onError(message);
        return;
      }

      if (inputElement) {
        ref.current = inputElement;
        if (inputElement.value) {
          const parsedDate = parseDate(inputElement.value);
          if (parsedDate) {
            setDate(parsedDate);
          }
        }
      } else if (mode === 'static' && !!form) {
        setHiddenInputProps({
          type: 'hidden',
          name: getHiddenInputId(form),
        });
      }
    },
    [
      getHiddenInputId,
      parseDate,
      getInputElement,
      mode,
      onError,
      datePickerType,
    ]
  );

  return {
    clear,
    date,
    handleSetDate,
    hiddenInputProps,
    ref,
    setDate,
    setHiddenInputProps,
    setToToday,
    hiddenInputComponent,
    inputSelector,
    type,
    initialize,
  };
}
