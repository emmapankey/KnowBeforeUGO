var sampleSearchTerm = "Mexico";
var queryURL = "https://api.tugo.com/v1/travelsafe/countries/:" + sampleSearchTerm + "X-Auth-API-Key:25y3249xkxg49uqkh6v6zcmz";

$.ajax({
    url: queryURL,
    method: "GET"
}).done(function (response) {
    console.log(response);
    var results = response.data;

    var generalSafetyInfo = results.safety.description;
    var crimeInfo = "";
    var demonstrationsInfo = "";
    var drivingInfo = "";
    var airTravelInfo = "";
    




});