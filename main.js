/**
 * Created by haohong on 11/7/2016.
 */
$(document).ready(function() {
    var markers = [{
        "title": '',
        "lat": '56.965969',
        "lng": '24.143496',
        "description": ''
    }, {
        "title": '',
        "lat": '56.966259',
        "lng": '24.385860',
        "description": ''
    }];
    var service = new google.maps.DirectionsService();
    var polyArray = [];
    var infoWindow = new google.maps.InfoWindow();
    var map = new google.maps.Map(document.getElementById("map_1"), mapOptions);
    var lat_lng = new Array();
    var colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    var image = 'https://maps.google.com/mapfiles/ms/micons/blue.png';
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(56.966259, 24.385860),
        map: map,
        title: 'Sillava',
        icon: image
    });
    for (i = 0; i < markers.length; i++) {
        var data = markers[i];
        var myLatlng = new google.maps.LatLng(data.lat, data.lng);
        lat_lng.push(myLatlng);
    }
    for (var i = 0; i < lat_lng.length; i++) {
        if ((i + 1) < lat_lng.length) {
            var src = lat_lng[i];
            var des = lat_lng[i + 1];
            service.route({
                origin: src,
                destination: des,
                provideRouteAlternatives: true,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            }, function(result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    for (var j = 0; j < result.routes.length; j++) {
                        var path = new google.maps.MVCArray();
                        polyArray.push(new google.maps.Polyline({
                            map: map,
                            strokeColor: "grey",
                            strokeOpacity: 0.3,
                            strokeWeight: 5
                        }));
                        if (j == 0) polyArray[0].setOptions({
                            strokeColor: '#00ff00',
                            strokeOpacity: 1.0
                        });
                        polyArray[polyArray.length - 1].setPath(path);
                        google.maps.event.addListener(polyArray[polyArray.length - 1], 'click', function() {
                            for (var i = 0; i < polyArray.length; i++) {
                                polyArray[i].setOptions({
                                    strokeOpacity: 0.3,
                                    strokeColor: "grey"
                                });
                            }
                            this.setOptions({
                                strokeOpacity: 1.0,
                                strokeColor: "#00ff00"
                            });
                        })
                        for (var i = 0, len = result.routes[j].overview_path.length; i < len; i++) {
                            path.push(result.routes[j].overview_path[i]);
                        }
                    }
                }
            });
        }
    }
});
var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(56.975749, 24.279310),
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: false,
    styles: [{
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
            "color": "#d3d3d3"
        }, {
            "lightness": 17
        }]
    }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
            "color": "#f5f5f5"
        }, {
            "lightness": 20
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#ffffff"
        }, {
            "lightness": 17
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#ffffff"
        }, {
            "lightness": 29
        }, {
            "weight": 0.2
        }]
    }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
            "color": "#ffffff"
        }, {
            "lightness": 18
        }]
    }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
            "color": "#ffffff"
        }, {
            "lightness": 16
        }]
    }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
            "color": "#f5f5f5"
        }, {
            "lightness": 21
        }]
    }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
            "color": "#dedede"
        }, {
            "lightness": 21
        }]
    }, {
        "elementType": "labels.text.stroke",
        "stylers": [{
            "visibility": "on"
        }, {
            "color": "#ffffff"
        }, {
            "lightness": 16
        }]
    }, {
        "elementType": "labels.text.fill",
        "stylers": [{
            "saturation": 36
        }, {
            "color": "#333333"
        }, {
            "lightness": 40
        }]
    }, {
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{
            "color": "#f2f2f2"
        }, {
            "lightness": 19
        }]
    }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#fefefe"
        }, {
            "lightness": 20
        }]
    }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#fefefe"
        }, {
            "lightness": 17
        }, {
            "weight": 1.2
        }]
    }]
};