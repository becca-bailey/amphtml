/** @externs */

/** @const */
var BentoAddthisDef = {};

/**
 * @typedef {{
 *  description: (string|undefined),
 *  media: (string|undefined),
 *  pubId: (string),
 *  title: (string|undefined),
 *  url: (string|undefined),
 *  widgetId: (string),
 *  widgetType: (string),
 * }}
 */
BentoAddthisDef.Props;

/** @interface */
BentoAddthisDef.BentoAddthisApi = class {
  /** Example: API method to toggle the component */
  exampleToggle() {} // DO NOT SUBMIT
};
