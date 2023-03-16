// map header
function map_luncher(btn) {
    let map_id = btn.getAttribute('data-map');
    let lat = document.getElementById(`${map_id}_lat`).value ? document.getElementById("lat").value : 21.452190359158408,
        lng = document.getElementById(`${map_id}_lng`).value ? document.getElementById("lng").value : 39.20488498374456;

    $(document).ready(function () {
        getLocation();
        initMap(lat, lng);
    });

    function initMap(lat, lng) {
        let latlng = new google.maps.LatLng(lat, lng);
        let map = new google.maps.Map(document.getElementById(map_id), {
            center: latlng,
            zoom: 11,
            animation: google.maps.Animation.DROP,
            mapTypeId: google.maps.MapType
        });
        // let input_form = document.getElementById(`${map_id}_input_form`);
        let input = document.getElementById(`${map_id}_search-input`);
        // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input_form);
        google.maps.event.addDomListener(input, 'keydown', function (event) {
            // console.log(event.keyCode);
            if (event.keyCode === 13) {
                event.preventDefault();
            }
        });
        // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        let autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);
        let infowindow = new google.maps.InfoWindow();
        const image = "images/mapmarker.png";
        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: map,
            title: 'الاحداثيات',
            draggable: true,
            icon: image,
            //anchorPoint: new google.maps.Point(0, 0)
        });
        autocomplete.addListener('place_changed', function () {
            infowindow.close();
            marker.setVisible(true);
            let place = autocomplete.getPlace();
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(11);
            }

            marker.setIcon(({
                icon: image,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35),
            }));

            marker.setPosition(place.geometry.location);
            marker.setVisible(true);

            let address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }

            infowindow.setContent('<div style=""><strong>' + place.name + '</strong><br>' + address);
            /* Location details */
            // console.log('hi');
            document.getElementById(`${map_id}_search-input`).value = place.formatted_address;
            document.getElementById(`${map_id}_lat`).value = place.geometry.location.lat();
            document.getElementById(`${map_id}_lng`).value = place.geometry.location.lng();
        });
        let geocoder = new google.maps.Geocoder();

        google.maps.event.addListener(map, 'click', function (event) {
            marker.setPosition(event.latLng);
            geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
                if (status === 'OK') {
                    // console.log('hi setPosition');
                    document.getElementById(`${map_id}_lat`).value = marker.getPosition().lat();
                    document.getElementById(`${map_id}_lng`).value = marker.getPosition().lng();
                    document.getElementById(`${map_id}_search-input`).value = results[0].formatted_address;
                    document.getElementById(`${map_id}_output`).innerHTML = results[2].formatted_address;
                }
            });

        });

        google.maps.event.addListener(marker, 'dragend', function (event) {
            // console.log('hi addListener');
            document.getElementById(`${map_id}_lat`).value = marker.getPosition().lat();
            document.getElementById(`${map_id}_lng`).value = marker.getPosition().lng();
            geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
                if (status === 'OK') {
                    document.getElementById(`${map_id}_search-input`).value = results[0].formatted_address;
                    document.getElementById(`${map_id}_output`).innerHTML = results[2].formatted_address;
                }
            });
        });

    }
    
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("يرجى تفعيل اللوكيشن")
        }
    }
   
    function showPosition(position) {
        initMap(position.coords.latitude, position.coords.longitude);
        let geocoder = new google.maps.Geocoder;
        // console.log('hi initMap');
        document.getElementById(`${map_id}_lat`).value = position.coords.latitude;
        document.getElementById(`${map_id}_lng`).value = position.coords.longitude;
        let latlng = { lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude) };
        geocoder.geocode({ 'location': latlng }, function (results, status) {
            if (status === 'OK') {
                document.getElementById(`${map_id}_search-input`).value = results[1].formatted_address;
                document.getElementById(`${map_id}_output`).innerHTML = results[2].formatted_address;
            }
        });
    }
}


// rep location map 
function repLocation (){
    const cairo = { lat: 30.064742, lng: 31.249509 };
    const map = new google.maps.Map(document.getElementById("map"), {
      scaleControl: true,
      center: cairo,
      zoom: 10,
    });
    const infowindow = new google.maps.InfoWindow();
  
    infowindow.setContent("<b>القاهرة</b>");
    const image = "images/mapmarker.png";
    const marker = new google.maps.Marker({ 
            map,
            position: cairo,
            icon: image,
    });
  
    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
}




