$(document).ready(function () {

var safetyApp = {};

// Ajax call for tugo.com
safetyApp.allCountries = function () {

    return $.ajax({
        url: 'https://api.tugo.com/v1/travelsafe/countries/',
        method: 'GET',
        dataType: 'json',
        headers: {
            'X-Auth-API-Key': '25y3249xkxg49uqkh6v6zcmz'
        }
    });
}

safetyApp.events = function () {
    // When the user types in the country name and hits enter,
    // the app needs to load list of countries, find the country that
    // the user searched, and then attach/remember the country code
    $('#buttonGetTravelAdvisory').on('click', function (e) {
        e.preventDefault();

        //Load all country names 
        const allCountries = safetyApp.allCountries();

        //Then look for the one that the user enters
        $.when(allCountries).done(function (countries) {
            var userCountry = $('.city').val();
            userCountry = safetyApp.upperCaseAll(userCountry);
            safetyApp.userCountry = userCountry;

            //Filter all the countries and show only that country's name and code
            var filteredCountry = countries.filter(function (country) {
                return country.englishName === safetyApp.userCountry;
            });

            //Variables
            safetyApp.filteredCountryName = filteredCountry[0].englishName; //name
            safetyApp.filteredCountryCode = filteredCountry[0].id; //country code
            safetyApp.showCountryInfo(safetyApp.filteredCountryCode); //get api for that country and load its info

            //Button resets to original state
            $('button').empty();
            $('button').append(buttonRdyText);
        });
    });
}

//When the user enters lowercase string, uppercase all first letters
safetyApp.upperCaseAll = function (string) {
    var letters = string.split(" ");
    for (var i = 0; i < letters.length; i++) {
        var j = letters[i].charAt(0).toUpperCase();
        letters[i] = j + letters[i].substr(1);
    }
    return letters.join(" ");
}

// Append the country code to the api query string and load country's info
safetyApp.showCountryInfo = function (code) {
    $.ajax({
        url: 'https://api.tugo.com/v1/travelsafe/countries/' + code,
        method: 'GET',
        dataType: 'json',
        headers: {
            'X-Auth-API-Key': '25y3249xkxg49uqkh6v6zcmz'
        }
    }).then(function (results) {
        // After accessing the api for the country, 
        // show all of its safety advisories

        console.log(results.safety);

    // This is where data needs to be displayed
    // var generalSafetyInfo = results.safety.description;
    // var crimeInfo = "";
    // var demonstrationsInfo = "";
    // var terrorismInfo = "";
    // var drivingInfo = "";
    // var medicalServicesInfo = "";

    })
};


safetyApp.events();
safetyApp.allCountries();
safetyApp.showCountryInfo();

});