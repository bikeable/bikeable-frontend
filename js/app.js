var commentMarkers = [];
var accidentMarkers = [];

var start;
    
    start = [44.955576, -93.226135]; // Hack Factory
    start = [44.965810, -93.269480]; // center of the jun20 awesome

var map = L.map('map').setView(start, 13);
 
// title
L.tileLayer(
  // 'http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', // has bike paths in red, blue
  // 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
  {
    attribution: '&copy; OpenCycleMap'
  }
).addTo(map);

function buildMap(rides,comments) {

  pathPoints = rides[0].pathPoints; // since we only have one path at the moment


  // PATH(s):
  // var startTimeStr = pathPoints[0].time;
  // var startMilli = Date.parse(startTimeStr);
  // _.each(pathPoints, function(point) {
  //   var circlePoint = L.circle([point.lat, point.lon], 4, {fillColor: '#000', fillOpacity: .7, stroke: false})
  //   var elapsed = Date.parse(point.time) - startMilli;
  //   circlePoint.bindPopup("Seconds: " + elapsed/1000);
  //   circlePoint.addTo(map);
  // });

  // ICONS:
  var BaseIcon = L.Icon.extend({
    options: {
      iconUrl: '/images/symbols/comment-neutral.png',
      // shadowUrl: 'leaf-shadow.png',
      iconSize:     [16, 16], // size of the icon
      // shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [8, 8], // point of the icon which will correspond to marker's location
      // shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
    }
  });

  var commentPositiveIcon = new BaseIcon({ iconUrl: '/images/symbols/comment-positive.png' });
  var commentNeutralIcon  = new BaseIcon({ iconUrl: '/images/symbols/comment-neutral.png'  });
  var commentNegativeIcon = new BaseIcon({ iconUrl: '/images/symbols/comment-negative.png' });
  
  var accidentIcon = L.icon({
    iconUrl: '/images/symbols/accident.png',
    // shadowUrl: 'leaf-shadow.png',
    iconSize:     [24, 24], // size of the icon
    // shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  });

  // COMMENTS:
  comments.forEach(function(comment, index){

    var icon;
    switch(comment.happiness){
      case 1:
        icon = commentPositiveIcon; break;
      case -1:
        icon = commentNegativeIcon; break;
      default:
        icon = commentNeutralIcon; break;
    }

    var commentMarker = L.marker( [comment.lat, comment.lon], {icon: icon }  ).addTo(map);
    commentMarker.bindPopup(comment.content + "<br/><sup>~" + comment.username + "</sup>");

    commentMarkers.push(commentMarker);

  });
  

  // ACCIDENTS:
  accidents.forEach( function(accident, index){

    var accidentMarker = L.marker( [accident.lat, accident.lon], {icon: accidentIcon }  ).addTo(map);

    accidentMarker.bindPopup(accident.accidentsPerYear + "<br/><sup>accidents per year</sup>");

    accidentMarkers.push(accidentMarker);
  });

}

function addActivities(activities) {

  var summaries = _.map(activities, 'route_summary');

  _.each(summaries, function(latlngs) {
    L.polyline(latlngs, {color: 'blue', opacity: .15 }).addTo(map);
  });

}

addActivities(activities);

buildMap(rides,comments);