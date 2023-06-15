$(document).ready(function(){
    $('#searchForm').submit(function(event){
        event.preventDefault();
        var searchTerm = $('#location').val();
        var url = "https://maps.googleapis.com/maps/api/geocode/json?key=" + gconfig.key + "&address=" + searchTerm;
        $.getJSON(url, function(data){
            var lat = data.results[0].geometry.location.lat;
            var lng = data.results[0].geometry.location.lng;
            initMap(data.results[0].formatted_address, lat, lng)
        });
    });
});

async function initMap(location, lat, lng) {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  const position = { lat: lat, lng: lng };

  const map = new Map(document.getElementById("map"), {
    center: position,
    zoom: 8,
    mapId: 'ab321b800b5e8a1'
  });

  // The marker, positioned at location
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: location,
  });

  $.ajax({
    url: '/api.weather.local',
    type: 'POST', 
    data: JSON.stringify({ location: location}),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json', 
    success: function(data){
        console.log(data);
        $('#weather-information').empty().append(
            $('<div class="form-group"/>').append(
                $('<label class="col-sm-2 control-label">Temperature</label>'),
                $('<div class="col-sm-10"><p class="form-control-static">' + data.temperature + 'F</p></div>')
            ),
            $('<div class="form-group"/>').append(
                $('<label class="col-sm-2 control-label">Humidity</label>'),
                $('<div class="col-sm-10"><p class="form-control-static">' + data.humidity + '%</p></div>')
            ),
            $('<div class="form-group"/>').append(
                $('<label class="col-sm-2 control-label">Wind Speed</label>'),
                $('<div class="col-sm-10"><p class="form-control-static">' + data.windSpeed + '</p></div>')
            ),
            $('<div class="form-group"/>').append(
                $('<label class="col-sm-2 control-label">Condition</label>'),
                $('<div class="col-sm-10"><p class="form-control-static">' + data.condition + '</p></div>')
            ),
        );
    }
  });
}
