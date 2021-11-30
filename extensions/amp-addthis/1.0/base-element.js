import {userAssert} from '#core/assert';
import {CSS as COMPONENT_CSS} from './component.jss';
import {BentoAddthis} from './component';
import {PreactBaseElement} from '#preact/base-element';

export class BaseElement extends PreactBaseElement {}

/** @override */
BaseElement['Component'] = BentoAddthis;

/** @override */
BaseElement['props'] = {
  'pubId': {
    attr: 'data-pub-id',
  },
  'widgetId': {
    attr: 'data-widget-id',
  },
  'widgetType': {
    attr: 'data-widget-type',
    parseAttrs: parseWidgetType,
  },
  'title': {
    attr: 'data-title',
  },
  'url': {
    attr: 'data-url',
  },
  'media': {
    attr: 'data-media',
  },
  'description': {
    attr: 'data-description',
  },
};

/**
 * Checks for valid data-widget-type attribute when given.
 * @param {!Element} element
 * @return {string}
 */
function parseWidgetType(element) {
  const widgetType = element.getAttribute('data-widget-type');
  userAssert(
    !widgetType || ['floating', 'inline'].indexOf(widgetType) !== -1,
    'Attribute data-widget-type for <amp-addthis> value is wrong, should be' +
      ' "floating" or "inline", but was: %s',
    widgetType
  );
  return widgetType;
}

/** @override */
BaseElement['layoutSizeDefined'] = true;

/** @override */
BaseElement['usesShadowDom'] = true;

// DO NOT SUBMIT: If BaseElement['shadowCss']  is set to `null`, remove the
// following declaration.
// Otherwise, keep it when defined to an actual value like `COMPONENT_CSS`.
// Once addressed, remove this set of comments.
/** @override */
BaseElement['shadowCss'] = COMPONENT_CSS;
