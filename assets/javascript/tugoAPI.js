$(document).ready(function () {

    var countries = null;

    // Function for the Ajax call to the tugo.com travel safety API to obtain an object listing
    // the 229 country names that the API has data on.
    function allCountries() {

        $.ajax({
            url: 'https://api.tugo.com/v1/travelsafe/countries/',
            method: 'GET',
            dataType: 'json',
            headers: {
                'X-Auth-API-Key': '25y3249xkxg49uqkh6v6zcmz'
            }
        }).done(function (response) {
            countries = response;
            console.log(countries);
        })
    }

    $("#buttonGetTravelAdvisory").on("click", function (e) {
        e.preventDefault();

        //Capture the country name entered by the user
        //Find the country searched by the user in the response object of all countries
        var userCountry = $("#countryInput").val();
        var matchedCountryID = null;


        // Append the country code to the api query string and load the info for the country searched by the user with another ajax call
        for (var i = 0; i < countries.length; i++) {
            var country = countries[i];
            if (country.englishName === userCountry) {
                matchedCountryID = country.id
            }
        }

        if (matchedCountryID === null) {
            alert("Data for this country is not available");
        }
        else {
            $.ajax({
                url: 'https://api.tugo.com/v1/travelsafe/countries/' + matchedCountryID,
                method: 'GET',
                dataType: 'json',
                headers: {
                    'X-Auth-API-Key': '25y3249xkxg49uqkh6v6zcmz'
                }
            }).done(function (response) {
                var countryDetails = response;
                console.log(countryDetails);
                displayCountryDetails(countryDetails);
            })
        }
    });
    
    // Display country advisory information on page
    function displayCountryDetails(countryDetails) {
        var crimeDescription = "";
        var terrorismDescription = "";

      
        if (countryDetails.safety !== null) {
            if (countryDetails.safety.safetyInfo != null) {
                for (var i = 0; i < countryDetails.safety.safetyInfo.length; i++) {
                    var safetyInfoObj = countryDetails.safety.safetyInfo[i];
                    if (safetyInfoObj.category === "Crime") {
                        crimeDescription = safetyInfoObj.description;
                    } else if (safetyInfoObj.category === "Terrorism") {
                        terrorismDescription = safetyInfoObj.description;
                    }
                }
            }
        }

        var displayCrimeDiv = $("<div id='crimeDiv'>");
        $(".emptyDiv").append("<h1>Crime</h1>")
        $(".emptyDiv").append(displayCrimeDiv);
        // displayCrimeDiv.text(countryDetails.safety.safetyInfo[0].description);
        displayCrimeDiv.text(crimeDescription);

        var displayTerrorismDiv = $("<div id='terrorismDiv'>");
        $(".emptyDiv").append("<h1>Terrorism</h1>")
        $(".emptyDiv").append(displayTerrorismDiv);
        displayTerrorismDiv.text(terrorismDescription);
        
    }
    allCountries();

}); // end of document.ready