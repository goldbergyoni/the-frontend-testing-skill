/**
 * Tooltip Annotation System
 * Dynamically inject Tippy.js tooltips into any page
 *
 * Usage:
 *   createTooltip('#my-element', 'Hello world!', 30000);
 *   createTooltip(document.querySelector('.my-class'), 'Custom text', 10000);
 */

/* eslint-env browser, node */

// =============================================================================
// CONFIGURATION
// =============================================================================

const TOOLTIP_STYLES = {
  theme: 'qodo-brand',
  background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
  color: '#ffffff',
  fontSize: '17.6px',
  fontWeight: '500',
  padding: '18px 24px',
  borderRadius: '12px',
  boxShadow: '0 10px 40px rgba(99, 102, 241, 0.4)',
  border: '3px solid #8B5CF6',
  arrowWidth: '50px',
  arrowHeight: '50px',
  arrowColor: '#6366F1',
  arrowBorderWidth: '25px',
};

const TIPPY_CONFIG = {
  placement: 'bottom',
  arrow: true,
  trigger: 'manual',
  showOnCreate: true,
  hideOnClick: false,
  maxWidth: 400,
  animation: 'scale',
  inertia: true,
  duration: [300, 250],
  offset: [0, 20],
};

const CDN_URLS = {
  popper: 'https://unpkg.com/@popperjs/core@2',
  tippy: 'https://unpkg.com/tippy.js@6',
  tippyCss: 'https://unpkg.com/tippy.js@6/dist/tippy.css',
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

// Loads an external JavaScript library from a CDN URL
// Returns a promise that resolves when the script is loaded successfully
function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
    document.head.appendChild(script);
  });
}

// Loads an external CSS stylesheet from a CDN URL
// Appends the link element to the document head
function loadStylesheet(url) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

// Generates CSS rules for the tooltip based on the style configuration
// Returns a string containing all the CSS rules including animations
function generateTooltipStyles() {
  const {
    theme,
    background,
    color,
    fontSize,
    fontWeight,
    padding,
    borderRadius,
    boxShadow,
    border,
    arrowWidth,
    arrowHeight,
    arrowColor,
    arrowBorderWidth,
  } = TOOLTIP_STYLES;

  return `
    .tippy-box[data-theme~='${theme}'] {
      background: ${background};
      color: ${color};
      font-size: ${fontSize};
      font-weight: ${fontWeight};
      padding: ${padding};
      border-radius: ${borderRadius};
      box-shadow: ${boxShadow};
      border: ${border};
    }

    .tippy-box[data-theme~='${theme}'][data-placement^='bottom'] > .tippy-arrow::before {
      border-bottom-color: ${arrowColor};
      transform: scale(2);
    }

    .tippy-box[data-theme~='${theme}'][data-placement^='top'] > .tippy-arrow::before {
      border-top-color: ${arrowColor};
      transform: scale(2);
    }

    .tippy-box[data-theme~='${theme}'][data-placement^='left'] > .tippy-arrow::before {
      border-left-color: ${arrowColor};
      transform: scale(2);
    }

    .tippy-box[data-theme~='${theme}'][data-placement^='right'] > .tippy-arrow::before {
      border-right-color: ${arrowColor};
      transform: scale(2);
    }
  `;
}

// Injects custom CSS styles into the document head
// Creates a style element with the provided CSS content
function injectStyles(cssContent) {
  const style = document.createElement('style');
  style.textContent = cssContent;
  document.head.appendChild(style);
}

// Removes any existing tooltips from the DOM
// Cleans up before creating a new tooltip instance
function removeExistingTooltips() {
  document.querySelectorAll('[data-tippy-root]').forEach((el) => el.remove());
}

// Resolves the target element from a selector string or DOM element
// Returns the DOM element or undefined if not found
function resolveElement(elementOrSelector) {
  if (typeof elementOrSelector === 'string') {
    return document.querySelector(elementOrSelector);
  }
  return elementOrSelector;
}

// Creates a Tippy.js tooltip instance on the target element
// Returns the tooltip instance for further manipulation
function createTippyInstance(targetElement, content) {
  return window.tippy(targetElement, {
    ...TIPPY_CONFIG,
    content,
    theme: TOOLTIP_STYLES.theme,
    popperOptions: {
      modifiers: [
        {
          name: 'arrow',
          options: {
            padding: 8,
          },
        },
      ],
    },
  });
}

// Schedules the tooltip to hide and destroy itself after a delay
// Uses a fade-out animation before destroying the instance
function scheduleAutoHide(tippyInstance, hideAfterMs) {
  setTimeout(() => {
    tippyInstance.hide();
    setTimeout(() => tippyInstance.destroy(), 300);
  }, hideAfterMs);
}

// =============================================================================
// MAIN FUNCTION
// =============================================================================

// Creates and displays an animated tooltip on any element
// Loads dependencies, injects styles, and manages the tooltip lifecycle
async function createTooltip(elementOrSelector, content, hideAfterMs = 30000) {
  try {
    removeExistingTooltips();

    await loadScript(CDN_URLS.popper);
    await loadScript(CDN_URLS.tippy);
    loadStylesheet(CDN_URLS.tippyCss);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const targetElement = resolveElement(elementOrSelector);

    if (!targetElement) {
      throw new Error(`Element not found: ${elementOrSelector}`);
    }

    const styles = generateTooltipStyles();
    injectStyles(styles);

    const tippyInstance = createTippyInstance(targetElement, content);

    scheduleAutoHide(tippyInstance, hideAfterMs);

    return tippyInstance;
  } catch (error) {
    console.error('Failed to create tooltip:', error);
    throw error;
  }
}

// =============================================================================
// EXPORTS
// =============================================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createTooltip };
}

// =============================================================================
// EXAMPLE USAGE (for testing in browser console)
// =============================================================================

// createTooltip(
//   "div[class='flex flex-col justify-between'] h2",
//   '👋 Welcome! This is your home dashboard where you can set up Qodo products and manage your team.',
//   30000
// );
