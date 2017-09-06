function convertDegToDec(gps) {
	var deg = gps[0];
  var min = gps[1];
  var sec = gps[2];
  
  var dec = deg + (min / 60.0) + (sec / 3600);
  return dec;
}

function getGeoDeg(img) {
	    var exif = $(img).exifAll()[0];
	console.log(exif);
	    var lat = convertDegToDec(exif.GPSLatitude);
	    var lng = convertDegToDec(exif.GPSLongitude);
		return [lat, lng];
}

// the smooth zoom function
function smoothZoom (map, max, cnt) {
    if (cnt >= max) {
            return;
        }
    else {
        z = google.maps.event.addListener(map, 'zoom_changed', function(event){
            google.maps.event.removeListener(z);
            smoothZoom(map, max, cnt + 1);
        });
        setTimeout(function(){map.setZoom(cnt)}, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
    }
}