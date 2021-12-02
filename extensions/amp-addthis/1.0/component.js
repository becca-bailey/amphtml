import * as Preact from '#preact';
import {useCallback, useMemo, useState} from '#preact';
import {forwardRef} from '#preact/compat';
import {ProxyIframeEmbed} from '#preact/component/3p-frame';

const ORIGIN = 'https://s7.addthis.com';
const MATCHES_MESSAGING_ORIGIN = (origin) => origin === ORIGIN;

/**
 * @param {!BentoAddthis.Props} props
 * @param {{current: ?BentoAddthisDef.Api}} ref
 * @return {PreactDef.Renderable}
 */
export function BentoAddthisWithRef(
  {description, media, pubId, style, title, widgetId, widgetType, ...rest},
  ref
) {
  const [height, setHeight] = useState(null);

  const messageHandler = useCallback((event) => {
    console.log(event);
  }, []);

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

  // TODO: Update src
  const src = useMemo(() => {
    return `${ORIGIN}/js/300/addthis_widget.js#pubid=${pubId}`;
  }, [pubId]);

  return (
    <ProxyIframeEmbed
      matchesMessagingOrigin={MATCHES_MESSAGING_ORIGIN}
      ref={ref}
      title={title || 'AddThis'}
      messageHandler={messageHandler}
      style={height ? {...style, height} : style}
      src={src}
      id={widgetId}
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
