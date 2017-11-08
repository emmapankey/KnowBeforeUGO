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
    
            genericText();
	
			// This function adds data from the sample object taken from the API documentation. We are using this for our presentation because the API's server is currently down.
            function genericText() {
        
                var displayAdvisoryP = $("<p>");
                $("#advisories-div").append(displayAdvisoryP);
                displayAdvisoryP.text("There is no nationwide advisory in effect for Greece. Exercise normal security precautions.");
    
                var displayCrimeP = $("<p>");
                $("#crime-div").append(displayCrimeP);
                displayCrimeP.text("Petty crime (pickpocketing, purse snatching, luggage theft, muggings) occurs in tourist areas and on public transport. Do not walk in the Athens districts of Monastiraki and Omonia, or around the two railway stations of Larissa and Peloponissos after dark. Avoid secluded areas, parks, and down-market bars and restaurants. Remain vigilant at all times.Women should not accept rides from strangers or casual acquaintances. Sexual assaults have occurred, particularly on the islands.Attacks against non-Caucasians have been reported in Athens and condemned by local authorities.");
            
                var displayTerrorismP = $("<p>");
                $("#terrorism-div").append(displayTerrorismP);
                displayTerrorismP.text("There have been periodic bomb attacks by anarchists and ultra-leftist militant groups against the Greek state, Greek institutions, and Western commercial and diplomatic interests on the mainland, including in Athens and Thessaloniki. Several bomb and arson attacks have occurred in urban areas. To enhance public safety, police officers conduct patrols in subway stations, bus terminals and other public places.Several attacks occurred in Athens in January 2013 in response to the latest round of austerity measures, as well as measures dealing with crime and corruption that were imposed by the Greek government.");
            
                var displayRoadSafetyP = $("<p>");
                $("#road-safety-div").append(displayRoadSafetyP);
                displayRoadSafetyP.text("The traffic fatality rate in Greece is among the highest in the European Union. Poor driving standards, aggressive drivers, difficult terrain and heavy traffic create hazards.Driving motorbikes, scooters and mopeds is particularly dangerous, especially on the islands. Travellers must obtain insurance coverage. A helmet is a legal requirement. Stiff fines can be imposed for non-compliance.Small, unlicensed rental agencies (especially on the islands) do not always offer vehicles that comply with up-to-date safety standards. Read the rental contract carefully.In the event of an accident, wait until the police arrive; otherwise the insurance may not be valid.");
            
                var displayFoodWaterP = $("<p>");
                $("#food-water-div").append(displayFoodWaterP);
                displayFoodWaterP.text("Travellers to any destination in the world can develop travellers' diarrhea from consuming contaminated water or food.In some areas in Southern Europe, food and water can also carry diseases like hepatitis A. Practice safe food and water precautions while travelling in Southern Europe. When in doubt, remember…boil it, cook it, peel it, or leave it!");
            
                var displayMedicalServicesP = $("<p>");
                $("#medical-services-div").append(displayMedicalServicesP);
                displayMedicalServicesP.text("Medical care is usually adequate but varies widely, and facilities are generally much better on the mainland than on the islands. Medical evacuation to a mainland hospital, which can be very expensive, may be necessary in the event of serious illness or injury. Make sure you have travel health insurance that covers all medical expenses for illness or injury (including hospitalization abroad and medical evacuation).");
            }
            
    
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
				// Need to finish modal when API server is back up
                // alert("Data for this country is not available");
                // $("#noCountryDataModal").append(data-backdrop);
                // $("#noCountryDataModal").append(data-keyboard)
                // $("#noCountryDataModal").modal({
                //     backdrop: true,
                //     keyboard: true,
                //     focus: true
                // })
    
                // $("#noCountryData").modal('show')
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
    
            //Need to finish vaccines and food/water once the API server is back up
            // if (countryDetails.health !== null) {
            //     if (countryDetails.health.diseasesAndVaccinesInfo != null) {
            //         for (var i = 0; i < countryDetails.health.diseasesAndVaccinesInfo; i++) {
            //             var vaccineInfoObj = countryDetails.health.diseasesAndVaccinesInfo[i];
            //             if (vaccineInfoObj.category === "Crime") {
            //                 crimeDescription = safetyInfoObj.description;
            //             } else if (safetyInfoObj.category === "Terrorism") {
            //                 terrorismDescription = safetyInfoObj.description;
            //             } else if (safetyInfoObj.category === "Road safety") {
            //                 roadSafetyDescription = safetyInfoObj.description;
            //             }
            //         }
            //     }
            // }
    
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
    
        allCountries();
    
    }); // end of document.ready