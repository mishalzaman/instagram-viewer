function initialize() {
    var mapCanvas = document.getElementById('map-canvas');
    var markers = [];

    var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#0c0b0b"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#090909"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#d4e4eb"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#fef7f7"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9b7f7f"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#fef7f7"}]}];

    var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});

    var mapOptions = {
		center: new google.maps.LatLng(44.5403, -78.5463),
		zoom: 5,
        maxZoom: 15,
        minZoom: 2,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        },
		disableDefaultUI: true
    }

    var map = new google.maps.Map(mapCanvas, mapOptions);

    google.maps.event.addDomListener(map, 'click', function(event) {
        placeMarker(event.latLng);
    });

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    function placeMarker(location) {
        var marker = new google.maps.Marker({
            position: location, 
            map: map
        });

        igViewer.getBYLatLong(location);
    };


};

google.maps.event.addDomListener(window, 'load', igViewer.init());
google.maps.event.addDomListener(window, 'load', initialize);