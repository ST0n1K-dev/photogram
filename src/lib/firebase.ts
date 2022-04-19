import firebase from 'firebase/compat/app';
import { getAnalytics } from 'firebase/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
    apiKey: 'AIzaSyCG7cpIGdkOuo_zTRq6TJCekViohkIo8w8',
    authDomain: 'photogram-diploma.firebaseapp.com',
    projectId: 'photogram-diploma',
    storageBucket: 'photogram-diploma.appspot.com',
    messagingSenderId: '782225158338',
    appId: '1:782225158338:web:2ad5d8fef5e81f177c8b5b',
    measurementId: 'G-277LGJ19H3'
};

const app = firebase.initializeApp(config);
const analytics = getAnalytics(app);

export { app as firebase, analytics };
