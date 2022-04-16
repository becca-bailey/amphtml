import {Button, DayProps, useDayRender} from 'react-day-picker';

import * as Preact from '#preact';
import {useRef} from '#preact';

import {useDatePickerContext} from './use-date-picker-context';

export function DayButton({date, displayMonth}: DayProps) {
  const buttonRef = useRef();

  const {buttonProps} = useDayRender(date, displayMonth, buttonRef);
  const {getLabel, getTemplate, isDisabled, isHighlighted} =
    useDatePickerContext();

  const template = getTemplate(date);

  if (typeof template === 'function') {
    return template(date);
  }

  return (
    <Button
      {...buttonProps}
      ref={buttonRef}
      aria-label={getLabel(date)}
      aria-disabled={isDisabled(date)}
      data-highlighted={isHighlighted(date)}
    />
  );
}
