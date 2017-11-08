$(document).ready(function () {
	//FIREBASE=========================================================
	// Initialize Firebase
	// var config = {
	// 	apiKey: "AIzaSyCmj08LcW2dT_bGaFPFqNcnoID7ZRqzQJw",
	// 	authDomain: "knowbeforugo.firebaseapp.com",
	// 	databaseURL: "https://knowbeforugo.firebaseio.com",
	// 	projectId: "knowbeforugo",
	// 	storageBucket: "knowbeforugo.appspot.com",
	// 	messagingSenderId: "172400475054"
	// };
	// firebase.initializeApp(config);
	//VARIABLES=========================================================
	var database = firebase.database();

	// CAPTURE BUTTON CLICK
	$(document.body).on("click", "#submitButton", function () {
		//VALUES FOR EACH VARIABLE IN HTML
		var city = $('#city-input').val().trim();
		var country = $('#country-input').val().trim();

		// PUSH NEW ENTRY TO FIREBASE
		database.ref().push({
			city: city,
			country: country,
			timeAdded: firebase.database.ServerValue.TIMESTAMP
		});
		// NO REFRESH
		// $("input").val('');
		// return false;
	});

	//ON CLICK CHILD FUNCTION
	database.ref().on("child_added", function (childSnapshot) {

		var city = childSnapshot.val().city;
		var country = childSnapshot.val().country;

		//TABLE DATA=====================================================
		$('#searches-table').append(
			"<tr><td id='cityDisplay'>" + childSnapshot.val().city +
			"</td><td id='countryDisplay'>" + childSnapshot.val().country + "</td></tr>");

	});

}); //END DOCUMENT.READY