const _ = require('lodash');
const webpush = require('web-push');
const Promise = require('bluebird');
const Storage = require('@google-cloud/storage');
const parseDataUri = require('parse-data-uri');
const uuidV4 = require('uuid/v4');
const mime = require('mime-types');
const key = require('../googleCloudKey.json');

exports.saveFileToGoogleStorage = (rawData) => {
  const storage = Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
    credentials: key,
  });

  const bucketName = process.env.GOOGLE_CLOUD_STORAGE_IMAGE_BUCKET;

  const parsed = parseDataUri(rawData);
  const newFilename = `${uuidV4()}.${mime.extension(parsed.mimeType)}`;


  const bucket = storage.bucket(bucketName)
    .file(newFilename)
    .createWriteStream({
      metadata: { contentType: parsed.mimeType },
      predefinedAcl: 'publicRead',
    });

  bucket.write(parsed.data);
  bucket.end();

  return newFilename;
};

exports.getFirstOrNullLocation = (brand) => {
  _.forEach(brand.trucks, (truck) => { /* eslint-disable no-param-reassign */
    if (truck.locations && truck.locations.length > 0) {
      truck.locations = truck.locations[0];
    } else {
      truck.locations = null;
    } /* eslint-enable no-param-reassign */
  });
};

exports.getLatestTruckLocation = (builder) => {
  const currentTime = new Date();
  const latestValidTime = new Date(currentTime - 28800000);
  return builder.whereBetween('start', [latestValidTime.toISOString(), currentTime.toISOString()])
                .andWhere('end', 0)
                .orWhere('end', '>', currentTime.toISOString())
                .orderBy('start', 'desc');
};

exports.notifyFollowers = (brand, message) =>
  Promise.all(_.reduce(brand.user_follows, (promises, user) => {
    const pushInfo = user.user_push_info;
    if (pushInfo) {
      promises.push(webpush.sendNotification(JSON.parse(pushInfo.subscription), message));
    }
    return promises;
  }, []));

/* eslint-disable */
exports.getBoundingBox = function (centerPoint, distance) {
  /**
   * @param {number} distance - distance (km) from the point represented by centerPoint
   * @param {array} centerPoint - two-dimensional array containing center coords [latitude, longitude]
   * @description
   *   Computes the bounding coordinates of all points on the surface of a sphere
   *   that has a great circle distance to the point represented by the centerPoint
   *   argument that is less or equal to the distance argument.
   *   Technique from: Jan Matuschek <http://JanMatuschek.de/LatitudeLongitudeBoundingCoordinates>
   * @author Alex Salisbury
   */
  var MIN_LAT, MAX_LAT, MIN_LON, MAX_LON, R, radDist, degLat, degLon, radLat, radLon, minLat, maxLat, minLon, maxLon, deltaLon;
  if (distance < 0) {
    return 'Illegal arguments';
  }
  // helper functions (degrees<–>radians)
  Number.prototype.degToRad = function () {
    return this * (Math.PI / 180);
  };
  Number.prototype.radToDeg = function () {
    return (180 * this) / Math.PI;
  };
  // coordinate limits
  MIN_LAT = (-90).degToRad();
  MAX_LAT = (90).degToRad();
  MIN_LON = (-180).degToRad();
  MAX_LON = (180).degToRad();
  // Earth's radius (km)
  // R = 6378.1;
  // Earth's radius (miles)
  R = 3959;
  // angular distance in radians on a great circle
  radDist = distance / R;
  // center point coordinates (deg)
  degLat = centerPoint[0];
  degLon = centerPoint[1];
  // center point coordinates (rad)
  radLat = degLat.degToRad();
  radLon = degLon.degToRad();
  // minimum and maximum latitudes for given distance
  minLat = radLat - radDist;
  maxLat = radLat + radDist;
  // minimum and maximum longitudes for given distance
  minLon = void 0;
  maxLon = void 0;
  // define deltaLon to help determine min and max longitudes
  deltaLon = Math.asin(Math.sin(radDist) / Math.cos(radLat));
  if (minLat > MIN_LAT && maxLat < MAX_LAT) {
    minLon = radLon - deltaLon;
    maxLon = radLon + deltaLon;
    if (minLon < MIN_LON) {
      minLon = minLon + 2 * Math.PI;
    }
    if (maxLon > MAX_LON) {
      maxLon = maxLon - 2 * Math.PI;
    }
  }
  // a pole is within the given distance
  else {
    minLat = Math.max(minLat, MIN_LAT);
    maxLat = Math.min(maxLat, MAX_LAT);
    minLon = MIN_LON;
    maxLon = MAX_LON;
  }
  return [
    minLon.radToDeg(),
    minLat.radToDeg(),
    maxLon.radToDeg(),
    maxLat.radToDeg()
  ];
};
/* eslint-enable */
