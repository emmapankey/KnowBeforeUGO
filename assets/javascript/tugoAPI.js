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

    $("#submitButton").on("click", function (e) {
        e.preventDefault();

        clearTugoData();

        //Capture the country name entered by the user
        //Find the country searched by the user in the response object of all countries
        var userCountry = $("#country-input").val();
        userCountry = firstLetterToUpperCase(userCountry);
        var matchedCountryID = null;
        console.log(countries);

        //When the user enters lowercase string, uppercase all first letters
        function firstLetterToUpperCase(string) {
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
                matchedCountryID = country.id;
                break;
            }
        }

        if (matchedCountryID === null) {
            // If the searched country is not found in the database show user input validation modal
            $("#noCountryDataModal").modal({
                backdrop: true,
                keyboard: true,
                focus: true
            })

            // clearInputs();
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
        var foodWaterDescription = "";
        var medicalServicesDescription = "";

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

        if (countryDetails.health !== null) {
            if (countryDetails.health.diseasesAndVaccinesInfo !== null) {
                //var diseasesObj = countryDetails.health.diseasesAndVaccinesInfo;
                if (countryDetails.health.diseasesAndVaccinesInfo["Food/Water"] !== null) {
                    var foodWater = countryDetails.health.diseasesAndVaccinesInfo["Food/Water"];
                    for (var i = 0; i < foodWater.length; i++) {
                        if (foodWater[i].category === "Food and Water-borne Diseases") {
                            foodWaterDescription = foodWater[i].description;
                            break;
                        }
                    }
                }
            }
            if (countryDetails.health.healthInfo !== null) {
                for (var i = 0; i < countryDetails.health.healthInfo.length; i++) {
                    if (countryDetails.health.healthInfo[i].category === "Medical services and facilities") {
                        medicalServicesDescription = countryDetails.health.healthInfo[i].description;
                        break;
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

        var displayFoodWaterP = $("<p>");
        $("#food-water-div").append(displayFoodWaterP);
        displayFoodWaterP.text(foodWaterDescription);

        var displayMedicalServicesP = $("<p>");
        $("#medical-services-div").append(displayMedicalServicesP);
        displayMedicalServicesP.text(medicalServicesDescription);

        clearInputs();

    } // end of displayCountryDetails function

    // clears the data displayed from prior searches
    function clearTugoData() {
        $("#advisories-div").empty();
        $("#crime-div").empty();
        $("#terrorism-div").empty();
        $("#road-safety-div").empty();
        $("#food-water-div").empty();
        $("#medical-services-div").empty();
    }

    function clearInputs() {      
        $("#city-input").each(function () {
        $(this).val("");
             x=1;
        });

        $("#country-input").each(function () {
            $(this).val("");
            x=1;
        });       
    }

    allCountries();

}); // end of document.ready