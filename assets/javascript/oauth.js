
// NOT USING RIGHT NOW

$(function () {

    // Initialize Firebase
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


    $("#btnSignIn").on("click", function () {
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    });


});






// // Variables

// const txtEmail = document.getElementById("txtEmail");
// const txtPassword = document.getElementById("txtPassword");
// const btnLogin = document.getElementById("btnLogin");
// const btnSignUp = document.getElementById("btnSignUp");
// const btnLogout = document.getElementById("btnLogout");




// // login on click
// btnLogin.addEventListener("click", e => {
//     // get email and password
//     const email = txtEmail.value;
//     const pass = txtPassword.value;
//     const auth = firebase.auth();

//     //sign in w/ email and password
//     const promise = auth.signInWithEmailAndPassword(email, pass);

//     promise.catch(e => console.log(e.message));
// });

// // signup
// btnSignUp.addEventListener("click", e => {
//     // get email and password
//     const email = txtEmail.value;
//     const pass = txtPassword.value;
//     const auth = firebase.auth();

//     // sign in w/ email and password
//     const promise = auth.createUserWithEmailAndPassword(email, pass);

//     promise.catch(e => console.log(e.message));
// });

// // authentication listener
// firebase.auth().onAuthStateChanged(firebaseUser => {
//     if (firebaseUser) {
//         console.log(firebaseUser);
//     } else {
//         console.log("Not logged in");
//     }

// });




