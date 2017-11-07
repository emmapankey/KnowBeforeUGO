$(document).ready(function () {

    var countries = null;

    // show loading gif when the Ajax call starts
    // hide the loading gif once the Ajax call stops
    $(document).ajaxStart(function () {
        $("#loading").show();
    }).ajaxStop(function () {
        $("#loading").hide();
    });

    // Function for the Ajax call to the tugo.com travel safety API to obtain an object listing
    // the 229 country names that the API has data on.
    function allCountries() {

        $.ajax({
            url: 'https://api.tugo.com/v1/travelsafe/countries/',
            method: 'GET',
            dataType: 'json',
            headers: {
                'X-Auth-API-Key': 'kxque5awprz33tnwz45ma33s'
            }
        }).done(function (response) {
            countries = response;
            console.log(countries);
        })
    }

    //Capture the country name entered by the user
    $("#submitButton").on("click", function (e) {
        e.preventDefault();

        clearTugoData();

        var userCountry = $("#country-input").val();
        userCountry = firstLetterToUpperCase(userCountry);
        var matchedCountryID = null;

        //When the user enters lowercase string, uppercase all first letters
        function firstLetterToUpperCase (string) {
            var letters = string.split(" ");
            for (var i = 0; i < letters.length; i++) {
                var j = letters[i].charAt(0).toUpperCase();
                letters[i] = j + letters[i].substr(1);
            }
            return letters.join(" ");
        }

        //Find the country searched by the user in the response object of all countries
        for (var i = 0; i < countries.length; i++) {
            var country = countries[i];
            if (country.englishName === userCountry) {
                matchedCountryID = country.id
            }
        }

        if (matchedCountryID === null) {
            // alert("Data for this country is not available");
            // $("#noCountryDataModal").append(data-backdrop);
            // $("#noCountryDataModal").append(data-keyboard)
            $("#noCountryDataModal").modal({
                backdrop: true,
                keyboard: true,
                focus: true
            })

            $("#noCountryData").modal('show')
        }

        // Add the matched country code to the api query string and load the info for the country searched by the user with another ajax call
        else {
            $.ajax({
                url: 'https://api.tugo.com/v1/travelsafe/countries/' + matchedCountryID,
                method: 'GET',
                dataType: 'json',
                headers: {
                    'X-Auth-API-Key': 'kxque5awprz33tnwz45ma33s'
                }
            }).done(function (response) {
                var countryDetails = response;
                console.log(countryDetails);
                displayCountryDetails(countryDetails);
            })
        }
    }); //end of click event

    // Display country advisory information on page
    function displayCountryDetails(countryDetails) {

        var advisoryDescription = "";
        var crimeDescription = "";
        var terrorismDescription = "";
        var roadSafetyDescription = "";

        if (countryDetails.advisories !== null) {
            advisoryDescription = countryDetails.advisories.description;
        }

        if (countryDetails.safety !== null) {
            if (countryDetails.safety.safetyInfo != null) {
                for (var i = 0; i < countryDetails.safety.safetyInfo.length; i++) {
                    var safetyInfoObj = countryDetails.safety.safetyInfo[i];
                    if (safetyInfoObj.category === "Crime") {
                        crimeDescription = safetyInfoObj.description;
                    } else if (safetyInfoObj.category === "Terrorism") {
                        terrorismDescription = safetyInfoObj.description;
                    } else if (safetyInfoObj.category === "Road safety") {
                        roadSafetyDescription = safetyInfoObj.description;
                    }
                }
            }
        }

        var displayAdvisoryP = $("<p>");
        $("#advisories-div").append(displayAdvisoryP);
        displayAdvisoryP.text(advisoryDescription);

        var displayCrimeP = $("<p>");
        $("#crime-div").append(displayCrimeP);
        displayCrimeP.text(crimeDescription);

        var displayTerrorismP = $("<p>");
        $("#terrorism-div").append(displayTerrorismP);
        displayTerrorismP.text(terrorismDescription);

        var displayRoadSafetyP = $("<p>");
        $("#road-safety-div").append(displayRoadSafetyP);
        displayRoadSafetyP.text(roadSafetyDescription);

    } // end of displayCountryDetails function

    // clears the data displayed from prior searches
    function clearTugoData() {
        $("#advisories-div").empty();
        $("#crime-div").empty();
        $("#terrorism-div").empty();
        $("#road-safety-div").empty();
    }

    allCountries();

}); // end of document.ready