var features = [];

/*
Draws an interative map - google map - with markers for each fuel station.
Lots of work to be done here.
*/
function initMap() {
  $.ajax({
  url: 'http://ausfuel.me/API/station_data_api.php',
  dataType: 'json',
  success: function onSuccess(jsonReturn) {
      for (var i = 0; i<jsonReturn.length; i++) {
        features[i] = {
          name: jsonReturn[i].name,
          latitude: jsonReturn[i].latitude,
          longtitude: jsonReturn[i].longtitude,
          bowser: jsonReturn[i].provider,
          prices: jsonReturn[i].prices          
        }
      }
      loadMap(features);
  },
  error: function onError(xhr) {
      alert(xhr.responseText);
  }
  });

}

function loadMap(features) {
  var images = {
    Caltex: {
        url: "https://i.imgur.com/ahCRLJz.png",
        scaledSize: new google.maps.Size(32, 64)
    }, 
    CaltexWoolworths: {
        url: "https://i.imgur.com/ahCRLJz.png",
        scaledSize: new google.maps.Size(32, 64)
    }, 
    BP: {
        url: "https://i.imgur.com/vdip4I3.png",
        scaledSize: new google.maps.Size(64, 64)
    },
    Mobil: {
        url: "https://i.imgur.com/kOgCNSk.png",
        scaledSize: new google.maps.Size(64, 64)
    }, 
    Seven11: {
        url: "https://i.imgur.com/kOgCNSk.png",
        scaledSize: new google.maps.Size(64, 64)
    },
    FreedomFuels: {
        url: "https://i.imgur.com/QiKVdpz.png",
        scaledSize: new google.maps.Size(64, 64)
    },
    United: {
        url: "https://i.imgur.com/IwAOGBd.png",
        scaledSize: new google.maps.Size(32, 64)
    },
    default: {
        url: "https://i.imgur.com/KaK8DS7.png",
        scaledSize: new google.maps.Size(32, 64)
    },
  };

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: new google.maps.LatLng(-27.470125, 153.021072),
    mapTypeId: 'roadmap'
  });

  features.forEach(function(feature) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(feature.latitude, feature.longtitude),
      map: map,
      title: feature.name
    });
    marker.addListener('click', function() {
      var infowindow = new google.maps.InfoWindow({
        content: buildContentString(feature.name, feature.prices),
        maxWidth: 200
      });
      infowindow.open(map, marker);
    });

  });

}

function buildContentString(station, type_price) {
  var price_string = "";
  for (var i = 0; i < type_price.length; i++) {
    price_string += "<div><b>" + type_price[i].fuel + ":</b> $" 
      + type_price[i].price/1000 + "</div>";
  }


  var contentString = '<div id="content">'+
    '<div id="siteNotice" class="">'+
    '</div>'+
    '<h3 id="firstHeading" class="first_heading">'+ station +
    '</h3><div id="bodyContent" class="fuel_popup_content">'+
     price_string +
    '</div>'+
    '</div>';
  return contentString;
}
