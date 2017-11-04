$(document).ready(function () {
	//FIREBASE=========================================================
    var config = {
        apiKey: "AIzaSyCQrXoV53FrxCll6Hau4DUDhCdIfZOCcAk",
        authDomain: "travel-app-436fa.firebaseapp.com",
        databaseURL: "https://travel-app-436fa.firebaseio.com",
        projectId: "travel-app-436fa",
        storageBucket: "travel-app-436fa.appspot.com",
        messagingSenderId: "42951308793"
      };
      firebase.initializeApp(config);    
	//VARIABLES=========================================================
	var database = firebase.database();

	// CAPTURE BUTTON CLICK
	$("#submitButton").on("click", function () {

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
		$("input").val('');
		return false;
	});

	//ON CLICK CHILD FUNCTION
	database.ref().on("child_added", function (childSnapshot) {

		var city = childSnapshot.val().city;
		var country = childSnapshot.val().country;

		//TABLE DATA=====================================================
		$('#display-searches-table').append(
			"<tr><td id='cityDisplay'>" + childSnapshot.val().city +
			"</td><td id='countryDisplay'>" + childSnapshot.val().country+ "</td></tr>");

	});

}); //END DOCUMENT.READY