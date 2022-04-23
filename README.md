# firebaseui_react_v9
## Install This Package
```
npm install firebaseui_react_v9
```
### or by Yarn
```
yarn add firebaseui_react_v9
```
#### NOTE:- YOU Need To Inisilize your Firebase App Before This 
## How To use This Library 
```
import FirebaseUi from "firebaseui_react_v9";
import {getAuth,onAuthStateChanged,EmailAuthProvider, GoogleAuthProvider,} from "firebase/auth";


const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Email and Google as auth providers.
  signInOptions: [
     EmailAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID,
  ],
};
export function Login(){
    const auth=getAuth();
    return <FirebaseUi uiConfig, firebaseAuth={auth}, className="LoginDiv",onAuthStateChanged }/>
}
```