function formatTime(time, zone) {
	return moment.tz(time, zone).format('h:mm A');
}
var map = null;

        var pictures = {};
        var dailyHash = {};
        var fourSqPicMap = {};
				var FS_CLIENT_ID = "UYESQ5LOJTXU22TVXQNCLX5B2LJBVS3J4FUBGR3HV55UC53R";
				var FS_CLIENT_SECRET = "VM0NGFWPMTSUS5W1ATRMUQQMKG0DKYSHXCUZ1YFQ4W1OM2HZ";
				
        var firstPic = null;
        Parse.initialize("GmMLPh1b6Y6z8bcw1umrNrQcUa3FeM6FA8mjK9hM", "9ZWXlWoyyirliLr0viWeUmyfScY8346ycuqTO4sU");
        Parse.User.logIn("Matt", "password", {
          success: function(user) {
            // Do stuff after successful login.
            console.log(user);
            var UserPhoto = Parse.Object.extend("UserPhoto");
            var pquery = new Parse.Query(UserPhoto);
            pquery.equalTo("user", user);
            pquery.ascending("timestamp");
            pquery.find({
              success: function(photos) {
                //pictures = photos;
                console.log(photos);
                var imgs = [];
                var i = 0;
                photos.forEach(function(pic) {
                  // var mom = moment(pic.get('timestamp'));
                  // console.log(mom);
                  // mom.tz("America/Toronto");
                  // console.log(mom);
                  // style="-webkit-transform: rotate(90deg);"
									var url = "https://api.foursquare.com/v2/venues/search?ll=" + pic.get('location').latitude + "," + pic.get('location').longitude + "&client_id=" + FS_CLIENT_ID + "&client_secret=" + FS_CLIENT_SECRET + "&v=20131016";
									$.getJSON(url, function(data) {
										console.log(data.response.venues[0]);
										fourSqPicMap[pic.id] = data.response.venues[0];
									});
		              var time = formatTime(pic.get("timestamp"), "Asia/Tokyo");

                  var imgTag = "<div class='col-md-1 thumb'><img id='" + pic.id + "' src='" + pic.get('thumbNailImage').url() + "' width='100'><br/><small>" + time + "</small></div>";
                  imgs.push(imgTag);
                  if(i == 9) {
		                $("#images").append("<div class='row'>" + imgs.join("") + "</div>");                
                    i = 0;
                    imgs = [];
                  }
                  else {
                    i++;                    
                  }
                  pictures[pic.id] = pic;
                });
                firstPic = photos[0];
                $("#images").append("<div class='row'>" + imgs.join("") + "</div>");                
								var url = "http://api.wikilocation.org/articles?lat=" + firstPic.get('location').latitude + "&lng=" + firstPic.get('location').longitude + "&limit=20"; 
								$.getJSON(url, function(data) {
									var map_points = [];
									data = data['articles'];
									for(i = 0; i < data.length; i++) {
										map_points.push([data[i].title, data[i].lat, data[i].lng, i]);
									}
									console.log(map);
									console.log(map_points);
									setMarkers(map, map_points, 'images/wikipedia.jpeg');
								});
								
								
								var config = {
								    apiKey: 'XXXXXXXXXXXXXX',
								    authUrl: 'https://foursquare.com/',
								    apiUrl: 'https://api.foursquare.com/'
								  };
								
								init();
              }
            });
          },
          error: function(user, error) {
            console.log(error);
            // The login failed. Check error to see why.
          }
        });

        
var images = [];
              
        // $("#start").click(
	function init() {
          var center = firstPic.get("location");
          $("#images .thumb").children('img').each(function(i) {
            var lat = pictures[this.id].get("location").latitude;
            var lng = pictures[this.id].get("location").longitude;
            var img = this;
            $(this).click(function() {

              // map.setZoom(15);  
              var myLatlng = new google.maps.LatLng(lat, lng);
              console.log(myLatlng);
              map.panTo(myLatlng);
              // setTimeout(function() {
              //   smoothZoom(map, 18, map.getZoom());            
              // }, 1000);
              // map.setZoom(18);                
              // console.log(exif);
              var imgTag = "<img id='theImg' src='" + pictures[img.id].get("imageFile").url() + "' width='600'";
console.log(pictures[img.id].get("orientation"));
              if(pictures[img.id].get("orientation") == 6) {
                imgTag += " style='-webkit-transform: rotate(90deg);' ";
              }
              imgTag += ">";
              var time = formatTime(pictures[img.id].get("timestamp"), "Asia/Tokyo");
							var place = fourSqPicMap[img.id].name + " " + fourSqPicMap[img.id].categories[0].name;
              $("#image-browser").html(imgTag + "<br/>" + time + "<br/><span id='place_name'>" + place + "</span>");
//							$("#place_name").translator({appID: "nX3dXqGKZjEMIrYkdTuUV5kanu4YMwXAIREwJkQ4cRU", tolang: 'en', callback: function() { console.log('completed call'); }} );
              if(true || map.getZoom() == 10) {
                map.setZoom(18);
              }
              else {
                map.setZoom(10);              
              }
              
              // var panoramaOptions = {
              //   position: myLatlng,
              //   pov: {
              //     heading: 34,
              //     pitch: 10
              //   }
              // };
              // var panorama = new  google.maps.StreetViewPanorama(document.getElementById('pano'),panoramaOptions);
              // map.setStreetView(panorama);
              
              // map.setZoom(9);
              // map.setCenter();
            });
            images.push(['pic', lat, lng, i]);

            // google.maps.event.addListener(marker,'click',function(e) {
            //                 map.setZoom(9);
            //                 map.setCenter(e.latLng);
            //             });    
          });
          var mapOptions = {
            zoom: 10,
            center: new google.maps.LatLng(center.latitude, center.longitude)
          }
          map = new google.maps.Map(document.getElementById('map-canvas'),
                                        mapOptions);

//                                         var panoramaOptions = {
//                                           position: mapOptions.center,
//                                           pov: {
//                                             heading: 34,
//                                             pitch: 10
//                                           }
//                                         };
//                                         var panorama = new  google.maps.StreetViewPanorama(document.getElementById('pano'),panoramaOptions);
// panorama.setVisible(true);
//                                         map.setStreetView(panorama);

          setMarkers(map, images, 'images/beachflag.png');

        };


    function initialize() {
      // console.log($("#img1"));
      // console.log('wtf');
    }

    var images = [];
    /**
     * Data for the markers consisting of a name, a LatLng and a zIndex for
     * the order in which these markers should display on top of each
     * other.
     */
    var beaches = [
      ['Bondi Beach', -33.890542, 151.274856, 4],
      ['Coogee Beach', -33.923036, 151.259052, 5],
      ['Cronulla Beach', -34.028249, 151.157507, 3],
      ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
      ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];

    function setMarkers(map, locations, img) {
      // Add markers to the map

      // Marker sizes are expressed as a Size of X,Y
      // where the origin of the image (0,0) is located
      // in the top left of the image.

      // Origins, anchor positions and coordinates of the marker
      // increase in the X direction to the right and in
      // the Y direction down.
      var image = {
        url: img,
        // This marker is 20 pixels wide by 32 pixels tall.
        size: new google.maps.Size(20, 32),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0,0),
        // The anchor for this image is the base of the flagpole at 0,32.
        anchor: new google.maps.Point(0, 32)
      };
      // Shapes define the clickable region of the icon.
      // The type defines an HTML &lt;area&gt; element 'poly' which
      // traces out a polygon as a series of X,Y points. The final
      // coordinate closes the poly by connecting to the first
      // coordinate.
      var shape = {
          coord: [1, 1, 1, 20, 18, 20, 18 , 1],
          type: 'poly'
      };
      for (var i = 0; i < locations.length; i++) {
        var beach = locations[i];
        var myLatLng = new google.maps.LatLng(beach[1], beach[2]);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: image,
            shape: shape,
            title: beach[0],
            zIndex: beach[3]
        });

        google.maps.event.addListener(marker, 'click', function(ev) {
          console.log(ev.latLng.nb + " " + ev.latLng.ob );
          $("#image-browser").html(ev.latLng.nb + " " + ev.latLng.ob);
          });
      }
    }

    google.maps.event.addDomListener(window, 'load', initialize);
