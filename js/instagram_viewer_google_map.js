// Mishal Zaman

function initialize() {
    var mapCanvas = document.getElementById('map-canvas'),
        styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#0c0b0b"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#090909"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#d4e4eb"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#fef7f7"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9b7f7f"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#fef7f7"}]}],
        styledMap = new google.maps.StyledMapType(styles,
            {name: "Styled Map"}
        ),
        mapOptions = {
            center: new google.maps.LatLng(44.5403, -78.5463),
            zoom: 6,
            maxZoom: 6,
            minZoom: 6,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            },
            disableDefaultUI: true,
            // disableDoubleClickZoom: true,
            scrollwheel: false
        },
        map = new google.maps.Map(mapCanvas, mapOptions);

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    // Get the latitude / longitude when user presses the search button
    document.getElementById("search-button").addEventListener("click", function(event){
        var location = map.getCenter();
        igViewer.getBYLatLong(location.lat(), location.lng());
    });

};

// Initialize igViewer object
google.maps.event.addDomListener(window, 'load', igViewer.init());

// Google Map function
google.maps.event.addDomListener(window, 'load', initialize);
