// Initialize Firebase
$(document).ready(function () {

    $("#btnSignOut").hide();
    $("#user-name").html("");

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

function showWelcome() {
    console.log("this is working");
    console.log(user.displayName);
    $("#btnSignOut").show();
    $("#btnSignIn").hide();
    $("#user-name").html("Welcome " + user.displayName);
}

function showGoodBye() {
    $("#btnSignIn").show();
    $("#btnSignOut").hide();
}


// //Handle Account Status
// firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//         window.location = 'index.html'; //After successful login, user will be redirected to home.html
//     }
// });





