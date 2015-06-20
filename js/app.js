var commentMarkers = [];

function buildMap(rides,comments) {

  pathPoints = rides[0].pathPoints; // since we only have one path at the moment

  var map = L.map('map').setView([45.001064, -93.256577], 13);

  // tile
  var layer = L.tileLayer( 'http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', { attribution: '&copy; OpenCycleMap' }  );
  var layer = L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap' }  );

  layer.addTo(map);

  // path(s)
  var startTimeStr = pathPoints[0].time;
  var startMilli = Date.parse(startTimeStr);
  _.each(pathPoints, function(point) {
    var circlePoint = L.circle([point.lat, point.lon], 2, {fillColor: '#000', fillOpacity: .7, stroke: false})
    var elapsed = Date.parse(point.time) - startMilli;
    circlePoint.bindPopup("Seconds: " + elapsed/1000);
    circlePoint.addTo(map);
  });



  var greenIcon = L.icon({
    iconUrl: '/images/dot-green.png',
    // shadowUrl: 'leaf-shadow.png',
    iconSize:     [16, 16], // size of the icon
    // shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [8, 8], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [8, 0] // point from which the popup should open relative to the iconAnchor
  });
  var redIcon = L.icon({
    iconUrl: '/images/dot-red.png',
    // shadowUrl: 'leaf-shadow.png',
    iconSize:     [16, 16], // size of the icon
    // shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [8, 8], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [8, 0] // point from which the popup should open relative to the iconAnchor
  });
  var grayIcon = L.icon({
    iconUrl: '/images/dot-gray.png',
    // shadowUrl: 'leaf-shadow.png',
    iconSize:     [16, 16], // size of the icon
    // shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [8, 8], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [8, 0] // point from which the popup should open relative to the iconAnchor
  });


  // comments
  comments.forEach(function(comment, index){

    var icon;
    switch(comment.happiness){
      case 1:
        icon = greenIcon; break;
      case -1:
        icon = redIcon; break;
      default:
        icon = grayIcon; break;
    }

    var commentMarker = L.marker( [comment.lat, comment.lon], {icon: icon }  ).addTo(map);

    commentMarker.bindPopup(comment.content + "<br/><sup>~" + comment.username + "</sup>");
    commentMarkers.push(commentMarker);
  });
  
}

buildMap(rides,comments);