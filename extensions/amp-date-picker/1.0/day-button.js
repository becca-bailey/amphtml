import {Button, useDay} from 'react-day-picker';

import * as Preact from '#preact';
import {useRef} from '#preact';

import {useAttributes} from './use-attributes';

/**
 * @param {!DayProps} props
 * @return {PreactDef.Renderable}
 */
export function DayButton({date, displayMonth}) {
  const buttonRef = useRef();

  const day = useDay(date, displayMonth, buttonRef);
  const {getLabel, isDisabled, isHighlighted} = useAttributes();

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
