import {parseBooleanAttribute} from '#core/dom';

import {PreactBaseElement} from '#preact/base-element';

import {BentoDatePicker} from './component';
import {CSS as COMPONENT_CSS} from './component.jss';
import {parseDate, parseDateList, parseLocale} from './parsers';

export class BaseElement extends PreactBaseElement {}

/** @override */
BaseElement['Component'] = BentoDatePicker;

/** @override */
BaseElement['props'] = {
  'allowBlockedEndDate': {
    attr: 'allow-blocked-end-date',
    parseAttr: parseBooleanAttribute,
  },
  'allowBlockedRanges': {
    attr: 'allow-blocked-ranges',
    parseAttr: parseBooleanAttribute,
  },
  'blocked': {attr: 'blocked', parseAttr: parseDateList},
  'children': {passthrough: true},
  // Not implemented
  'daySize': {attr: 'day-size', type: 'number'},
  'endInputSelector': {attr: 'end-input-selector'},
  // Not implemented
  'firstDayOfWeek': {attr: 'first-day-of-week', type: 'number'},
  'format': {attr: 'format'},
  // Not implemented
  'fullscreen': {attr: 'fullscreen', type: 'boolean'},
  // Not implemented
  'hideKeyboardShortcutsPanel': {
    attr: 'hide-keyboard-shortcuts-panel',
    parseAttr: parseBooleanAttribute,
  },
  'highlighted': {attr: 'highlighted', parseAttr: parseDateList},
  'initialVisibleMonth': {attr: 'initial-visible-month', parseAttr: parseDate},
  'inputSelector': {attr: 'input-selector'},
  'locale': {attr: 'locale', parseAttr: parseLocale},
  'max': {attr: 'max', parseAttr: parseDate},
  'maximumNights': {attr: 'maximum-nights', type: 'number'},
  'min': {attr: 'min', parseAttr: parseDate},
  'minimumNights': {attr: 'minimum-nights', type: 'number'},
  'mode': {attr: 'mode'},
  'monthFormat': {attr: 'month-format'},
  'numberOfMonths': {attr: 'number-of-months', type: 'number'},
  'openAfterClear': {
    attr: 'open-after-clear',
    type: 'boolean',
  },
  'openAfterSelect': {
    attr: 'open-after-select',
    type: 'boolean',
  },
  'startInputSelector': {attr: 'start-input-selector'},
  'today': {attr: 'today', parseAttr: parseDate},
  'type': {attr: 'type'},
  'weekDayFormat': {attr: 'week-day-format'},
};

/** @override */
BaseElement['layoutSizeDefined'] = true;

/** @override */
BaseElement['usesShadowDom'] = true;

/** @override */
BaseElement['shadowCss'] = COMPONENT_CSS;
