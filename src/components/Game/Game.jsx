import "./Game.css";
import { useState, useEffect, act } from "react";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import { Loader } from "@googlemaps/js-api-loader";
import { cross, dot, subtract, add, hypot, norm, min } from "mathjs";

// right now we have ~20% hit rate
// include coordinate ranges for a bounding box as the first entry in each region
// then select a region randomly and use its bounding box to pick a more likely point
const bounds = [
  // lower north america
  [
    [59.296338, -136.117621, 0],
    [27.539017, -109.289898, 0],
    [27.060244, -98.043189, 0],
    [31.507297, -83.157269, 0],
    [46.346664, -65.406439, 0],
    [59.832046, -95.659366, 0],
    [59.296338, -136.117621, 0],
  ],
  // upper north america
  [
    [59.296338, -136.117621, 0],
    [59.832046, -95.659366, 0],
    [68.866294, -119.585039, 0],
    [70.212266, -161.789693, 0],
    [59.316144, -156.143002, 0],
    [59.296338, -136.117621, 0],
  ],
  // south america
  [
    [11.935981, -71.523013, 0],
    [-5.015398, -79.478448, 0],
    [-51.579247, -70.181133, 0],
    [-6.890172, -37.113364, 0],
    [11.935981, -71.523013, 0],
  ],
  // central america
  [
    [27.539017, -109.289898, 0],
    [16.853717, -99.340142, 0],
    [5.514611, -74.078601, 0],
    [27.060244, -98.043189, 0],
    [27.539017, -109.289898, 0],
  ],
  // upper africa
  [
    [36.197404, -0.330825, 0],
    [25.244837, -14.411157, 0],
    [7.234484, -11.366761, 0],
    [5.595827, 11.31399, 0],
    [6.819031, 44.269577, 0],
    [31.208848, 32.472542, 0],
    [36.197404, -0.330825, 0],
  ],
  // saudia arabia
  [
    [31.208848, 32.472542, 0],
    [6.819031, 44.269577, 0],
    [25.198937, 59.263228, 0],
    [37.285031, 38.409115, 0],
    [31.208848, 32.472542, 0],
  ],
  // lower africa
  [
    [5.595827, 11.31399, 0],
    [-33.800738, 19.0772, 0],
    [-31.990189, 30.037025, 0],
    [6.819031, 44.269577, 0],
    [5.595827, 11.31399, 0],
  ],
  // eastern europe
  [
    [37.285031, 38.409115, 0],
    [66.319579, 43.812918, 0],
    [70.460289, 25.165992, 0],
    [52.921105, -9.311794, 0],
    [36.18716, -8.322365, 0],
    [37.285031, 38.409115, 0],
  ],
  // western europe
  [
    [66.319579, 43.812918, 0],
    [37.285031, 38.409115, 0],
    [25.198937, 59.263228, 0],
    [55.703144, 126.802587, 0],
    [66.319579, 43.812918, 0],
  ],
  // australia
  [
    [-34.827751, 115.622989, 0],
    [-38.886479, 145.840917, 0],
    [-27.848631, 154.309635, 0],
    [-11.373108, 134.677606, 0],
    [-22.397165, 113.005385, 0],
    [-34.827751, 115.622989, 0],
  ],
  // new zealand
  [
    [-45.779536, 166.025152, 0],
    [-46.505714, 170.058876, 0],
    [-37.71213, 178.777735, 0],
    [-37.665869, 174.167764, 0],
    [-45.779536, 166.025152, 0],
  ],
  // lower SEA
  [
    [-11.373108, 134.677606, 0],
    [-6.767201, 150.14236, 0],
    [2.754198, 126.877984, 0],
    [4.749881, 95.468911, 0],
    [-7.08975, 105.3032, 0],
    [-11.373108, 134.677606, 0],
  ],
  // upper SEA
  [
    [2.754198, 126.877984, 0],
    [29.540883, 120.899429, 0],
    [23.749193, 90.226845, 0],
    [4.749881, 95.468911, 0],
    [2.754198, 126.877984, 0],
  ],
  // india
  [
    [9.605498, 77.359956, 0],
    [23.749193, 90.226845, 0],
    [55.703144, 126.802587, 0],
    [25.198937, 59.263228, 0],
    [9.605498, 77.359956, 0],
  ],
  // east asia
  [
    [55.703144, 126.802587, 0],
    [23.749193, 90.226845, 0],
    [29.540883, 120.899429, 0],
    [35.266986, 141.434465, 0],
    [53.341443, 143.730576, 0],
    [55.703144, 126.802587, 0],
  ],
];

const template = [
  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
];

function CalculateScoreValue(geodistance) {
  return Math.round(
    min(1.01 * Math.pow(1 - geodistance / 20000000, 3), 1) * 5000
  );
}

// return a valid random coordinate
function GetPosition() {
  let point = [0, 0, 0];
  let breakout = 0;
  do {
    point = [Math.random() * 180 - 90, Math.random() * 360 - 180, 0];
    breakout++;
    if (breakout >= 25) return { lat: 0, lng: 0 };
  } while (!ValidatePosition(point));
  return { lat: point[0], lng: point[1] };
}

// check a point lies within the regions
function ValidatePosition(point) {
  for (let i = 0; i < bounds.length; i++) {
    if (ValidatePositionInRegion(i, point)) return true;
  }
  return false;
}

// check a point lies within a region
function ValidatePositionInRegion(index, point) {
  for (let j = 1; j < bounds[index].length; j++) {
    // get the boundary line
    const boundary = subtract(bounds[index][j], bounds[index][j - 1]);
    // get the direction line
    const direction = subtract(point, bounds[index][j]);
    // get the cross product
    const normal = cross(direction, boundary);
    // check sign of magnitude
    if (normal[2] < 0) return false;
  }
  return true;
}

function Game() {
  const [panorama, setPanorama] = useState(null);
  const [map, setMap] = useState(null);
  const [mapMarker, setMapMarker] = useState(null);

  // game state
  const [guess, setGuess] = useState(null);
  const [actual, setActual] = useState(null);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [recapState, setRecapState] = useState(false);

  const fenway = { lat: 42.345573, lng: -71.098326 };

  let newPanorama = null;
  let newMap = null;
  let newMarker = null;

  useEffect(() => {
    setActual(GetPosition());
    setRound(1);
    setScore(0);

    const loader = new Loader({
      apiKey: "AIzaSyDtw4jIS0wrL1nl7HC50zDT-ZhMNx5Jb94",
      version: "weekly",
    });

    if (panorama == null) {
      console.log("creating panorama");
      loader
        .importLibrary("streetView")
        .then(({ StreetViewPanorama }) => {
          console.log("successfully loaded streetView library");
          newPanorama = new StreetViewPanorama(
            document.getElementById("pano"),
            {
              position: fenway,
              addressControl: false,
              zoomControl: false,
            }
          );
          newPanorama.addListener("position_changed", () => {
            console.log(newPanorama.getPosition().lat());
          });
          setPanorama(newPanorama);
        })
        .catch(console.error);
    }

    loader
      .importLibrary("maps")
      .then(({ Map }) => {
        if (map == null) {
          console.log("successfully loaded maps library");
          newMap = new Map(document.getElementById("map"), {
            center: fenway,
            zoom: 8,
            streetViewControl: false,
            gestureHandling: "greedy",
            mapId: "4504f8b37365c3d0",
          });
          setMap(newMap);
        }
      })
      .catch(console.error);

    loader.importLibrary("marker").then(({ AdvancedMarkerElement }) => {
      if (mapMarker == null) {
        console.log("successfully loaded marker library");
        newMarker = new AdvancedMarkerElement({
          map,
          position: fenway,
        });
        newMap.addListener("click", (e) => {
          const position = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          };
          newMarker.setMap(newMap);
          newMarker.position = position;
          setGuess(position);
        });
        setMapMarker(newMarker);
      }
    });
  }, []);

  return (
    <div className="game">
      <div className="game__pano" id="pano">
        <div className="game__map" id="map"></div>
        {!recapState ? (
          <button
            className="game__guess-button"
            disabled={guess == null}
            onClick={(e) => {
              // #render regions
              // for (let i = 0; i < bounds.length; i++) {
              //   for (let j = 1; j < bounds[i].length; j++) {
              //     new google.maps.Polyline({
              //       map,
              //       path: [
              //         { lat: bounds[i][j][0], lng: bounds[i][j][1] },
              //         { lat: bounds[i][j - 1][0], lng: bounds[i][j - 1][1] },
              //       ],
              //       geodesic: false,
              //       strokeColor: "#FF0000",
              //       strokeWeight: 2,
              //     });
              //   }
              // }

              // iterate score
              const newScore = CalculateScoreValue(
                google.maps.geometry.spherical.computeDistanceBetween(
                  guess,
                  actual
                )
              );
              setScore(score + newScore);

              // iterate round
              if (round === 5) {
                // end game
              } else {
                setRound(round + 1);
              }

              // draw map graphics
              new google.maps.Polyline({
                map,
                path: [guess, actual],
                geodesic: false,
                strokeColor: "#FF0000",
                strokeWeight: 2,
              });
              new google.maps.marker.AdvancedMarkerElement({
                map,
                position: actual,
              });

              setRecapState(true);
            }}
          >
            Make Guess
          </button>
        ) : (
          <button
            className="game__guess-button"
            onClick={(e) => {
              const newPosition = GetPosition();
              const test = new google.maps.LatLng(
                newPosition.lat,
                newPosition.lng
              );
              setActual(newPosition);
              const test2 = new google.maps.StreetViewService();
              test2
                .getPanorama({
                  location: newPosition,
                  radius: 2000000,
                  preference: google.maps.StreetViewPreference.NEAREST,
                })
                .then((data) => {
                  console.log(data);
                  panorama.setPano(data.data.location.pano);
                });
              setRecapState(false);
            }}
          >
            Next Round
          </button>
        )}

        <div className="game__header">
          <p>Round: {round} / 5</p>
          <p>Score: {score}</p>
        </div>
      </div>
    </div>
  );
}

export default Game;
