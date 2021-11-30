import * as Preact from '#preact';
import {useMemo} from '#preact';
import {forwardRef} from '#preact/compat';
import {ProxyIframeEmbed} from '#preact/component/3p-frame';

/**
 * @param {!BentoAddthis.Props} props
 * @param {{current: ?BentoAddthisDef.Api}} ref
 * @return {PreactDef.Renderable}
 */
export function BentoAddthisWithRef(
  {description, media, pubId, title, url, widgetId, widgetType, ...rest},
  ref
) {
  // Check for valid props
  if (!checkProps(widgetId)) {
    displayWarning('widgetId prop is required for BentoAddthis');
  }
  if (!checkProps(pubId)) {
    displayWarning('pubId prop is required for BentoAddthis');
  }
  if (!checkProps(widgetType)) {
    displayWarning('widgetType prop is required for BentoAddthis');
  }

  const options = useMemo(() => {
    return {
      url,
    };
  }, [url]);

  return (
    <ProxyIframeEmbed
      options={options}
      ref={ref}
      title={title || 'AddThis'}
      type="addthis"
      {...rest}
    />
  );
}

/**
 * Verify required props and throw error if necessary.
 * @param {string|undefined} url URL to check
 * @return {boolean} true on valid
 */
function checkProps(url) {
  // Perform manual checking as assertion is not available for Bento: Issue #32739
  return !!url;
}

/**
 * Display warning in browser console
 * @param {?string} message Warning to be displayed
 */
function displayWarning(message) {
  console /*OK*/
    .warn(message);
}

const BentoAddthis = forwardRef(BentoAddthisWithRef);
BentoAddthis.displayName = 'BentoAddthis';
export {BentoAddthis};
