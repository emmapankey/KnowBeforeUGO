// This function is called in the script located in index.html
function initMap(){
    var options = {
        zoom:16,
        center:{lat:38.9072,lng:-77.0369}
    }
  
    var map = new google.maps.Map(document.getElementById('map'), options);
  
    var geocoder = new google.maps.Geocoder();
  
    $("#submitButton").on("click", function() {
        geocodeAddress(geocoder, map);
    });
  }
  
  // Captures the city input by a user, geocodes the coordinates for that location, and updates the map to center on those coordinates
  function geocodeAddress(geocoder, resultsMap) {
    var country = $("#country-input").val();
    var city = $("#city-input").val();
    var address = city + ", " + country;
    console.log(address);
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        $("#map").html("An invalid search was entered.");
      }
    });
  }