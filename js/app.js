function buildMap(rides) {

  pathPoints = rides[0].pathPoints; // since we only have one path at the moment

  var map = L.map('map').setView([45.001064, -93.256577], 13);

  L.tileLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', { // has bike paths in red, blue
    attribution: '&copy; OpenCycleMap'
  }).addTo(map);

  var startTimeStr = pathPoints[0].time;
  var startMilli = Date.parse(startTimeStr);
  _.each(pathPoints, function(point) {
    var circlePoint = L.circle([point.lat, point.lon], 2, {fillColor: '#000', fillOpacity: .7, stroke: false})
    var elapsed = Date.parse(point.time) - startMilli;
    circlePoint.bindPopup("Seconds: " + elapsed/1000);
    circlePoint.addTo(map);
  });
}

buildMap(rides);