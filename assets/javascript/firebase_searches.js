$(document).ready(function () {
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
    });

    //ON CLICK CHILD FUNCTION
    database.ref().on("child_added", function (childSnapshot) {

        var city = childSnapshot.val().city;
        var country = childSnapshot.val().country;

        //TABLE DATA=====================================================
        $('#searches-table').append(
            "<tr><td>" + childSnapshot.val().city +
            "</td><td>" + childSnapshot.val().country +
            "</td></tr>");

    });

}); //END DOCUMENT.READY