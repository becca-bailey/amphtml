import {Button, DayProps, useDayRender} from 'react-day-picker';

import * as Preact from '#preact';
import {useRef} from '#preact';

import {useDay} from './use-day';

export function DayButton({date, displayMonth}: DayProps) {
  const buttonRef = useRef();

  const day = useDayRender(date, displayMonth, buttonRef);
  const {getLabel, isDisabled, isHighlighted} = useDay();

  return (
    <Button
      {...day.buttonProps}
      ref={buttonRef}
      aria-label={getLabel(date)}
      aria-disabled={isDisabled(date)}
      data-highlighted={isHighlighted(date)}
    />
  );
}
