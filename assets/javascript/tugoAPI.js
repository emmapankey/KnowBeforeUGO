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

    $("#submitButton").on("click", function (e) {
        e.preventDefault();

        //Capture the country name entered by the user
        //Find the country searched by the user in the response object of all countries
        var userCountry = $("#country-input").val();
        var matchedCountryID = null;
        console.log(countries);


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

        var advisoryDescription = "";
        var crimeDescription = "";
        var terrorismDescription = "";
        var roadSafetyDescription = "";
        var advisoriesExpanded = "";

        if (countryDetails.advisoryText !== null) {
            advisoryDescription = countryDetails.advisoryText;
        }

      if (countryDetails.advisories !== null) {
          if (countryDetails.advisories != null) {
              for (var i = 0; i < countryDetails.advisories.length; i++) {
                  var advisoriesInfoObj = countryDetails.advisories[i];
                  if (advisoriesInfoObj.description !== null) {
                      advisoriesExpanded = advisoriesInfoObj.description;
                  }
              }
          }
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

        var displayExpandedAdvisoryP = $("<p>");
        $(displayAdvisoryP).append(displayExpandedAdvisoryP);
        displayExpandedAdvisoryP.text(advisoriesExpanded);

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

    allCountries();

}); // end of document.ready