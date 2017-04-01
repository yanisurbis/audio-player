import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCoEaMWfFk7YLbEMcNCFeZdsD7L2LDSnN4",
    authDomain: "audio-player-23967.firebaseapp.com",
    databaseURL: "https://audio-player-23967.firebaseio.com",
    projectId: "audio-player-23967",
    storageBucket: "audio-player-23967.appspot.com",
    messagingSenderId: "582117067994"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();