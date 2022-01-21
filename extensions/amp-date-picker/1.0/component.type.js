/** @externs */

import {DatePickerMode, DatePickerType} from './constants';
import {DatesList} from './dates-list';

/** @const */
var BentoDatePickerDef = {};

/**
 * @typedef {{
 * allowBlockedEndDate: (boolean|undefined)
 * allowBlockedRanges: (boolean|undefined)
 * blocked: (Array<Date|string>|string|undefined)
 * children: (?PreactDef.Renderable|undefined),
 * endInputSelector: (string|undefined)
 * format: (string|undefined)
 * blocked: (Array<Date|string>|string|undefined)
 * id: (string|undefined)
 * initialVisibleMonth: (Date|undefined)
 * inputSelector: (string|undefined)
 * max: (Date|undefined)
 * min: (Date|undefined)
 * mode: (DatePickerMode|undefined)
 * monthFormat: (string|undefined)
 * onError: (function(string): void|undefined)
 * startInputSelector: (string|undefined)
 * type: (DatePickerType|undefined)
 * weekdayFormat: (string|undefined)
 * }}
 * }}
 */
BentoDatePickerDef.Props;

/**
 * @typedef {{
 * blocked: (Array<Date|string>|string|undefined)
 * children: (?PreactDef.Renderable|undefined),
 * format: (string|undefined)
 * blocked: (Array<Date|string>|string|undefined)
 * id: (string|undefined)
 * initialVisibleMonth: (Date|undefined)
 * inputSelector: (string|undefined)
 * max: (Date|undefined)
 * min: (Date|undefined)
 * mode: (DatePickerMode|undefined)
 * monthFormat: (string|undefined)
 * onError: (function(string): void|undefined)
 * type: (DatePickerType|undefined)
 * weekdayFormat: (string|undefined)
 * }}
 * }}
 */
BentoDatePickerDef.SingleDatePickerProps;

/**
 * @typedef {{
 * allowBlockedEndDate: (boolean|undefined)
 * allowBlockedRanges: (boolean|undefined)
 * blocked: (Array<Date|string>|string|undefined)
 * children: (?PreactDef.Renderable|undefined),
 * endInputSelector: (string|undefined)
 * format: (string|undefined)
 * blocked: (Array<Date|string>|string|undefined)
 * id: (string|undefined)
 * initialVisibleMonth: (Date|undefined)
 * max: (Date|undefined)
 * min: (Date|undefined)
 * mode: (DatePickerMode|undefined)
 * monthFormat: (string|undefined)
 * onError: (function(string): void|undefined)
 * startInputSelector: (string|undefined)
 * type: (DatePickerType|undefined)
 * weekdayFormat: (string|undefined)
 * }}
 * }}
 */
BentoDatePickerDef.DateRangePickerProps;

/**
 * @typedef {{
 * allowBlockedEndDate: (boolean|undefined)
 * blockedDates: DatesList
 * highlightedDates: DatesList
 * min: (Date|undefined)
 * max: (Date|undefined)
 * }}
 * }}
 */
BentoDatePickerDef.AttributesContext;

/**
 * @typedef {{
 * getLabel: function(Date!): string
 * isDisabled: function(Date!): boolean
 * isHighlighted: function(Date!): boolean
 * }}
 * }}
 */
BentoDatePickerDef.AttributesContextFunctions;

/** @interface */
BentoDatePickerDef.BentoDatePickerApi = class {
  /**
   */
  clear() {}

  /**
   * @param {({ offset: number|undefined}|undefined)} args
   */
  today(args) {}

  /**
   * @param {Date|undefined} date
   */
  setDate(date) {}
};
