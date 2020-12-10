

import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import dynamicLinks from '@react-native-firebase/dynamic-links';


const firebaseConfig = {
  apiKey: "AIzaSyBi1lUgtUraRBxa0s2P5iYzS0HHIbUhaUQ",
  authDomain: "flincsapplication-896f0.firebaseapp.com",
  databaseURL: "https://flincsapplication-896f0.firebaseio.com",
  projectId: "flincsapplication-896f0",
  storageBucket: "flincsapplication-896f0.appspot.com",
  messagingSenderId: "852494159031",
  appId: "1:852494159031:web:8fb25743aa1f37ef359132",
  measurementId: "G-5WTRSP2ZZ7"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export {
  firebase,
  Auth,
  database,
  dynamicLinks

};


// const Setup = () => {
 
//   return <App />;
// };

// export default Setup;