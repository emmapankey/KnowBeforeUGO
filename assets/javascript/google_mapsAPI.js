// Initialize map function which is preset to center on the coordinates for Washington, DC
// function is called in the script located in index.html
function initMap(){
    var options = {
        zoom:16,
        center:{lat:38.9072,lng:77.0369}
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
    var embassy = "US embassy in ";
    var address = embassy + country;
    console.log(address);
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

// //Is only adding place info to the init map
//   var infowindow = new google.maps.InfoWindow();
//   var service = new google.maps.places.PlacesService(map);
//   service.getDetails({placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'}, function(place, status) {
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//       var marker = new google.maps.Marker({
//         map: map,
//         position: place.geometry.location
//       });
//       google.maps.event.addListener(marker, 'click', function() {
//         infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
//           'Place ID: ' + place.place_id + '<br>' +
//           place.formatted_address + '</div>');
//         infowindow.open(map, this);
//       });
//     }
//   });
