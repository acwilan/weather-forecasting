$(document).ready(function(){
    $('#searchForm').submit(function(event){
        event.preventDefault();
        var searchTerm = $('#location').val();
        var url = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCOVakodpYAD9sQ71nldMXJq5HfFHCE6FU&address=" + searchTerm;
        $.getJSON(url, function(data){
            console.log(data);
            var lat = data.results[0].geometry.location.lat;
            var lng = data.results[0].geometry.location.lng;
            initMap(data.results[0].formatted_address, lat, lng)
        });
    });
});

async function initMap(location, lat, lng) {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const map = new Map(document.getElementById("map"), {
    center: { lat: lat, lng: lng },
    zoom: 8,
    mapId: 'ab321b800b5e8a1'
  });
  $.ajax({
    url: '/api.weather.local',
    type: 'POST', 
    data: JSON.stringify({ location: location}),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json', 
    success: function(data){
        const form = document.createElement('div');
        form.className = 'form-horizontal';
        $(form).append(
            $('<div class="form-group"/>').append(
                $('<label class="col-sm-2 control-label">Temperature</label>'),
                $('<div class="col-sm-10"><p class="form-control-static">' + data.temperature + '°C</p></div>')
            ),
            $('<div class="form-group"/>').append(
                $('<label class="col-sm-2 control-label">Humidity</label>'),
                $('<div class="col-sm-10"><p class="form-control-static">' + data.humidity + '°C</p></div>')
            ),
            $('<div class="form-group"/>').append(
                $('<label class="col-sm-2 control-label">Wind Speed</label>'),
                $('<div class="col-sm-10"><p class="form-control-static">' + data.windSpeed + '°C</p></div>')
            ),
            $('<div class="form-group"/>').append(
                $('<label class="col-sm-2 control-label">Condition</label>'),
                $('<div class="col-sm-10"><p class="form-control-static">' + data.condition + '°C</p></div>')
            ),
        );
        console.log(form.outerHTML);
        const marker = new AdvancedMarkerElement({
            map,
            position: {lat: lat, lng: lng},
            content: form
        });
    }
  });
}
