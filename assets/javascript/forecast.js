(function (forecast, $, undefined) {

	forecast.getCity = function () {

		var button = document.getElementById("buttonGetForecast");
		button.onclick = function () {
			var city = document.getElementById("city").value;
			forecast.getForecast(city);
		};

	}

	//Get forecast from JSON response from the API
	forecast.getForecast = function (value) {
		// var lat = 37.8;
		// var long = -122.4;
		var key = "af271888d996ac3d";
		var urlAPI = "http://api.wunderground.com/api/" + key + "/features/forecast/q/MA/" + value + ".json";
		// var urlAPI = "http://api.wunderground.com/api/" + key + "/features/forecast/q/" + value + ".json";37.8,-122.4
		http: //api.wunderground.com/api/af271888d996ac3d/planner_MMDDMMDD/q/CA/San_Francisco.json
			// Assuming that the div or any other HTML element has the ID = loading and it contains the necessary loading image.
			var loading = $("#loading");
		$(document).ajaxStart(function () {
			loading.show();
		});

		$.ajax({
			url: urlAPI,
			dataType: "jsonp",
			success: function (parsed_json) {

				//Clear last zip code search before
				$('#list_dayForecast').empty();

				//Hide loading icon
				$(document).ajaxStop(function () {
					loading.hide();
				});

				//If no info was founded with the zip code

				if (parsed_json.forecast == null) {
					//Hide the loading icon
					$("#loading").hide();
					$("#noMatch").append(parsed_json.response.error.description);

					//If we get some forecast for the given zip code
				} else {
					//Delete message if it was for the previous search
					$("#noMatch").empty();

					var infoForecastLength = parsed_json.forecast.simpleforecast.forecastday.length;

					//All the information for 3 days that we have
					for (var i = 0; i < infoForecastLength; i++) {

						var tr = document.createElement("tr");
						//Each row is identified by the location name in order to do not mix them
						tr.setAttribute("id", parsed_json.forecast.simpleforecast.forecastday[i].date.weekday);
						var td1 = document.createElement("td");
						td1.setAttribute("class", "weekday");
						var td2 = document.createElement("td");
						var td3 = document.createElement("td");
						var td4 = document.createElement("td");
						var td5 = document.createElement("td");
						//Column for the icon
						var icon = document.createElement("img");
						icon.setAttribute("src", parsed_json.forecast.simpleforecast.forecastday[i].icon_url);
						td4.appendChild(icon);

						td1.innerHTML = parsed_json.forecast.simpleforecast.forecastday[i].date.weekday;
						td2.innerHTML = parsed_json.forecast.simpleforecast.forecastday[i].high.fahrenheit + "\xB0" + "F";
						td3.innerHTML = parsed_json.forecast.simpleforecast.forecastday[i].low.fahrenheit + "\xB0" + "F";

						tr.appendChild(td1);
						tr.appendChild(td2);
						tr.appendChild(td3);
						tr.appendChild(td4);
						$('#list_dayForecast').append(tr);
					}
				}
			}
		});
	}

})(window.forecast = window.forecast || {}, jQuery)