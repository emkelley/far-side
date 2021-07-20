import { firebase } from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import router from './routes';

const config = {
  apiKey: 'AIzaSyDFKDQiE5-7b40JDU9ttHxyh-gGofi7b-s',
  authDomain: 'far-side.firebaseapp.com',
  projectId: 'far-side',
  storageBucket: 'far-side.appspot.com',
  messagingSenderId: '12042286413',
  appId: '1:12042286413:web:ebfd19156f41a53309b304',
};

// init firebase
!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

// utils
export const db = firebase.firestore();
export const auth = firebase.auth();

const authWithEmail = (creds: Object) => {
  return new Promise((resolve, reject) => {
    auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() =>
        auth
          .signInWithEmailAndPassword(creds.email, creds.password)
          .then((user) => resolve(user))
          .catch((err) => reject(err))
      )
      .catch((err) => reject(err));
  });
};

const logUserOut = () => auth.signOut().then(() => router.replace('/login'));

const sendPasswordResetEmail = (email: String) => {
  return new Promise((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

export { logUserOut, authWithEmail, sendPasswordResetEmail };
