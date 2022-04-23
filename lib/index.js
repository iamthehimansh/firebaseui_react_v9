import React, { useEffect } from "react";

// Global ID for the element.
const ELEMENT_ID = "firebaseui_container";

// Promise that resolves unless the FirebaseUI instance is currently being deleted.
let firebaseUiDeletion = Promise.resolve();

export default function FirebaseAuth({ uiConfig, firebaseAuth, className,onAuthStateChanged }) {
  useEffect(() => {
    require("firebaseui/dist/firebaseui.css");
    let firebaseUiWidget;
    let userSignedIn = false;
    let unregisterAuthObserver;
    const firebaseui=require("firebaseui")
    // Get or Create a firebaseUI instance.
    firebaseUiWidget =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebaseAuth);

    if (uiConfig.signInFlow === "popup") firebaseUiWidget.reset();

    // We track the auth state to reset firebaseUi if the user signs out.
    unregisterAuthObserver = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user && userSignedIn) firebaseUiWidget.reset();
      userSignedIn = !!user;
    });

    // Render the firebaseUi Widget.
    firebaseUiWidget.start("#" + ELEMENT_ID, uiConfig);

    return () => {
      unregisterAuthObserver();
      firebaseUiWidget.reset();
    };
  }, [uiConfig]);
  return <div className={className} id={ELEMENT_ID} />;
}
