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