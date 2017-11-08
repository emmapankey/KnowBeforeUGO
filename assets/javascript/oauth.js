// Initialize Firebase
$(document).ready(function () {

    $("#btnSignOut").hide();
    // $("#user-name").html("");

});


var config = {
    apiKey: "AIzaSyCmj08LcW2dT_bGaFPFqNcnoID7ZRqzQJw",
    authDomain: "knowbeforugo.firebaseapp.com",
    databaseURL: "https://knowbeforugo.firebaseio.com",
    projectId: "knowbeforugo",
    storageBucket: "knowbeforugo.appspot.com",
    messagingSenderId: "172400475054"
};
firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();
var user;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("you are logged in");
        showWelcome();
    } else {
        console.log("you arent logged in");
        showGoodBye();
    }
   });


function signIn() {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        user = result.user;
        showWelcome();

    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
};


function signOut() {
    firebase.auth().signOut().then(function () {
        showGoodBye();
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
}

// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.local)
// .then(function() {
//   // Existing and future Auth states are now persisted in the current
//   // session only. Closing the window would clear any existing state even
//   // if a user forgets to sign out.
//   // User will stay signed in.
//   // New sign-in will be persisted with session persistence.
//   return firebase.auth().signInWithPopup(provider);
// })
// .catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
// });


function showWelcome() {
    $("#btnSignOut").show();
    $("#btnSignIn").hide();
    $("#user-name").html("Welcome " + user.displayName);
}

function showGoodBye() {
    $("#btnSignIn").show();
    $("#btnSignOut").hide();
}






