$(document).ready(function () {
	
		(function (forecast, $, undefined) {
	
			$('#buttonGetForecast').on('click', function () {
		//Need a button with id=buttonGetForecast
		//Need a input with id=buttonGetForecast
				var button = document.getElementById("buttonGetForecast"); 
				// button.onclick = function () {+ "country-input"
				var city = document.getElementById("city-input").value;
				var country = document.getElementById("country-input").value;
				forecast.getForecast(city + "," + country);
				// };
			});
	
			//Get forecast from JSON response from the API
			forecast.getForecast = function (value) {
				// var lat = 37.8;
				// var long = -122.4;
				var key = "af271888d996ac3d";
				var urlAPI = "http://api.wunderground.com/api/" + key + "/features/forecast/q/" + value + ".json";
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
	
							//All the information for 4 days that we have
							for (var i = 0; i < infoForecastLength; i++) {
	
								var tr = document.createElement("tr");
								//Each row is identified by the location name in order to do not mix them
								tr.setAttribute("id", parsed_json.forecast.simpleforecast.forecastday[i].date.weekday);
								var td1 = document.createElement("td");
								td1.setAttribute("class", "weekday");
								var td2 = document.createElement("td");
								var td3 = document.createElement("td");
								var td4 = document.createElement("td");
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

		var safetyApp = {};
		
				// Ajax call for tugo.com
				safetyApp.allCountries = function(){
		
					return $.ajax ({
						url: 'https://api.tugo.com/v1/travelsafe/countries/', 
						method: 'GET',
						dataType: 'json',
						headers: {
							'X-Auth-API-Key':'25y3249xkxg49uqkh6v6zcmz'
						}
					});
				}
		
				safetyApp.events = function(){
					// When the user types in the country name and hits enter,
					// the app needs to load list of countries, find the country that
					// the user searched, and then attach/remember the country code
					$('#buttonGetForecast').on('click', function(e){
						e.preventDefault();
		
						//When clicked, button will change text to indicate loading
						var buttonLoadTxt = "Checking...";
						var buttonLoad = `${buttonLoadTxt}<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>`;
						var buttonRdyText = "Check Safety";
						$('button').empty();
						$('button').append(buttonLoad);
		
						//Load all country names 
						const allCountries = safetyApp.allCountries(); 
		
						//Then look for the one that the user enters
						$.when(allCountries).done(function(countries){   		
							var userCountry = $('#country-input').val(); 
							userCountry = safetyApp.upperCaseAll(userCountry);
							safetyApp.userCountry = userCountry;
		
							//Filter all the countries and show only that country's name and code
							var filteredCountry = countries.filter(function(country){
								return country.englishName === safetyApp.userCountry;
							})
							
							//If it doesn't exist, then tell the user
							if (filteredCountry.length < 1){
								$('.info').empty();
								$('button').empty();
								$('button').append(buttonRdyText);
								$('.search--notice').show();
								$('.search--notice').append(`<p>Sorry! Not found.</p>`)
		
								$('input').click(function(){
									$('.search--notice').empty();
									$('.search--notice').hide();
									$('input').val('');
								})
							}
		
							//Variables
							safetyApp.filteredCountryName = filteredCountry[0].englishName; //name
							safetyApp.filteredCountryCode = filteredCountry[0].id; //country code
							safetyApp.showCountryInfo(safetyApp.filteredCountryCode); //get api for that country and load its info
		
							//Button resets to original state
							$('button').empty();
							$('button').append(buttonRdyText);
						});
					})
				}
		
				//When the user enters lowercase string, uppercase all first letters
				safetyApp.upperCaseAll = function(string){
					var letters = string.split(" ");
					for ( var i = 0; i < letters.length; i++ )
					{
						var j = letters[i].charAt(0).toUpperCase();
						letters[i] = j + letters[i].substr(1);
					}
					return letters.join(" ");
				}
		
				// Append the country code to the api query string and load country's info
				safetyApp.showCountryInfo = function(code){
					$.ajax ({
						url: 'https://api.tugo.com/v1/travelsafe/countries/' + code, 
						method: 'GET',
						dataType: 'json',
						headers: {
							'X-Auth-API-Key':'25y3249xkxg49uqkh6v6zcmz'
						}
					}).then(function(results){ 
						// After accessing the api for the country, 
						// show all of its safety advisories
		
						$('.info').show();
						$('html, body').animate({
							scrollTop: $(".info").offset().top},
						'slow');
		
						safetyApp.advisoryText = results.advisoryText; //general advisory
						safetyApp.advisoryDescription = results.advisories.description; //details
						safetyApp.safetyInfo = results.safety.safetyInfo; //list of threats
		
						$('.info--crimeAdvisory').html(`
							<h2>${safetyApp.filteredCountryName} (${safetyApp.filteredCountryCode})
								Travel Advisory
							</h2>
							<div class="info--advisoryOverall">
								<i class="fa fa-warning fa-3x" aria-hidden="true"></i>
								<h3 class="warning">
								${safetyApp.advisoryText}
								</h3>
							</div>
							<p>${safetyApp.advisoryDescription}</p>
							<p></p>
						`);
		
						//If high threat, red notice
						//If mod-normal threat, yellow notice
						var advisoryContent = safetyApp.advisoryText;
		
						if (advisoryContent.indexOf('Avoid all travel') >= 0){
							$('.info--advisoryOverall').addClass('highThreat');
						} else if (advisoryContent.indexOf('high') >= 0){
							$('.info--advisoryOverall').addClass('highThreat');
						} else { 
							$('.info--advisoryOverall').addClass('normModThreat');
						};
		
						// Now get list of threats (objects) from arrays			
						var crimesList = safetyApp.safetyInfo;
						var crimes = crimesList.forEach(function(value) {
							var threat = `<h3 class="cat--h3">${value.category}<i class="fa fa-chevron-down down"></i></h3>`;
							var description = `<p class="des--p">${value.description}</p>`;
							var threatDetails = $('<div>').append(threat, description);
							$('.info--crimeAdvisory').append(threatDetails);
							$('.des--p').hide();
						})
		
						// Click effect on each threat (dropdown)
						$('.cat--h3').on('click', function(){
							$(this).siblings().toggle("slow");
						})
					})
				};	
		
			safetyApp.loadEffects = function(){
				$(".search--inputContainer").addClass("active");
			}
		
		// Initialize
		safetyApp.init = function() {
			safetyApp.loadEffects();
			safetyApp.events();
		}
		
		// Document Ready
		$(function(){
			safetyApp.init();
			$('.info').hide();	
			$('.search--notice').hide();
		})
		
	});