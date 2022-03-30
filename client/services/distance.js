// distance between two geo coordinates in miles
export const getDistance = (myLat, eventLat, myLon, eventLon) => {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  myLon = (myLon * Math.PI) / 180;
  eventLon = (eventLon * Math.PI) / 180;
  myLat = (myLat * Math.PI) / 180;
  eventLat = (eventLat * Math.PI) / 180;

  // Haversine formula - distance between two points on a sphere (ignoring hills):
  let dlon = eventLon - myLon;
  let dlat = eventLat - myLat;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(myLat) * Math.cos(eventLat) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // 6371 is the radius of earth in kilometers. Use 3956 for miles.
  let r = 3956;

  // calculate the result
  return c * r;
};
