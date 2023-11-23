/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import  firebase from '@react-native-firebase/app';

if(!firebase.apps.length){
    firebase.initializeApp({
        apiKey: 'AIzaSyBYQLSvBvWkeuS4FPw2Riql2G5W7TCYb1c',
        projectId: 'schovela-62d60',
        storageBucket: 'schovela-62d60.appspot.com',
        appId: '1:55091586231:android:45f5de21747d741764d932',
        databaseURL : '',
        messagingSenderId : ''
    })
}

AppRegistry.registerComponent(appName, () => App);
