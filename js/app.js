var commentMarkers = [];

var map = L.map('map').setView([45.001064, -93.256577], 13);

// title
L.tileLayer(
  // 'http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', // has bike paths in red, blue
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; OpenCycleMap'
  }
).addTo(map);

function buildMap(rides,comments) {

  pathPoints = rides[0].pathPoints; // since we only have one path at the moment


  // path(s)
  var startTimeStr = pathPoints[0].time;
  var startMilli = Date.parse(startTimeStr);
  _.each(pathPoints, function(point) {
    var circlePoint = L.circle([point.lat, point.lon], 2, {fillColor: '#000', fillOpacity: .7, stroke: false})
    var elapsed = Date.parse(point.time) - startMilli;
    circlePoint.bindPopup("Seconds: " + elapsed/1000);
    circlePoint.addTo(map);
  });

  // comments
  comments.forEach(function(comment, index){
    var commentMarker = L.marker([comment.lat, comment.lon]).addTo(map);
    commentMarker.bindPopup(comment.content + "<br/><sup>~" + comment.username + "</sup>");
    commentMarkers.push(commentMarker);
  });
  
}

buildMap(rides,comments);