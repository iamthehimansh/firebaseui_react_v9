"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FirebaseUi;

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Global ID for the element.
const ELEMENT_ID = "firebaseui_container"; // Promise that resolves unless the FirebaseUI instance is currently being deleted.

let firebaseUiDeletion = Promise.resolve();

function FirebaseUi(_ref) {
  let {
    uiConfig,
    firebaseAuth,
    className,
    onAuthStateChanged,
    importCss = true
  } = _ref;
  (0, _react.useEffect)(() => {
    if (importCss) require("firebaseui/dist/firebaseui.css");
    let firebaseUiWidget;
    let userSignedIn = false;
    let unregisterAuthObserver;

    const firebaseui = require("firebaseui"); // Get or Create a firebaseUI instance.


    firebaseUiWidget = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebaseAuth);
    if (uiConfig.signInFlow === "popup") firebaseUiWidget.reset(); // We track the auth state to reset firebaseUi if the user signs out.

    unregisterAuthObserver = onAuthStateChanged(firebaseAuth, user => {
      if (!user && userSignedIn) firebaseUiWidget.reset();
      userSignedIn = !!user;
    }); // Render the firebaseUi Widget.

    firebaseUiWidget.start("#" + ELEMENT_ID, uiConfig);
    return () => {
      unregisterAuthObserver();
      firebaseUiWidget.reset();
    };
  }, [uiConfig]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className,
    id: ELEMENT_ID
  });
}