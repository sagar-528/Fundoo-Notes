import * as firebase from 'firebase';

  // Initialize Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyCDXImKD9WL9BrA1BYZeQ-qw4FQcnJabFI",
    authDomain: "fundoo-notes-b6dd1.firebaseapp.com",
    projectId: "fundoo-notes-b6dd1",
    storageBucket: "fundoo-notes-b6dd1.appspot.com",
    messagingSenderId: "676223296112",
    appId: "1:676223296112:web:8c089d49437836cf2f8ab5",
    measurementId: "G-GK0FPZ785N"
  };

 const Firebase = firebase.initializeApp(firebaseConfig);

  export default Firebase;