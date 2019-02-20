var features = [];

function initMap() {
  $.ajax({
  url: 'http://localhost/FP/API/station_data_api.php?',
  dataType: 'json',
  success: function onSuccess(jsonReturn) {
      for (var i = 0; i<jsonReturn.length; i++) {
        features[i] = {
          latitude: jsonReturn[i].latitude,
          longtitude: jsonReturn[i].longtitude,
          bowser: jsonReturn[i].provider,
          type: 'info'          
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
      icon: images[feature.bowser],
      map: map
    });
  });

}