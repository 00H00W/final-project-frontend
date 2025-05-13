import "./Game.css";
import { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import {
  GetPosition,
  CalculateScoreValue,
  GetPano,
} from "../../utils/GoogleAPI";
import Button from "../Button/Button";

function Game() {
  // map components
  const [panorama, setPanorama] = useState(null);
  const [map, setMap] = useState(null);
  const [mapMarker, setMarker] = useState(null);

  // game state
  const [guess, setGuess] = useState(null);
  const [actual, setActual] = useState(null);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [recapState, setRecapState] = useState(false);

  const fenway = { lat: 42.345573, lng: -71.098326 };

  function GetRecapState() {
    console.log(recapState);
    return recapState;
  }

  function makeGuess(e) {
    console.log(mapMarker);
    if (!recapState) {
      const position = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      mapMarker.setMap(map);
      mapMarker.position = position;
      setGuess(position);
    }
  }

  const submitGuess = () => {
    // iterate score
    const newScore = CalculateScoreValue(
      google.maps.geometry.spherical.computeDistanceBetween(guess, actual)
    );
    setScore(score + newScore);

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
    const pinStyle = new google.maps.marker.PinElement({
      background: "#258ac9",
      borderColor: "#0d6297",
      glyphColor: "#0d6297",
    });
    new google.maps.marker.AdvancedMarkerElement({
      map,
      position: guess,
      content: pinStyle.element,
    });

    // remove old guess
    setGuess(null);
    mapMarker.setMap(null);

    // toggle recap state
    setRecapState(true);
  };

  const nextRound = () => {
    // iterate round
    if (round === 5) {
      // end game
    } else {
      setRound(round + 1);
    }

    // set new panorama position
    const newPosition = GetPosition();
    setActual(newPosition);
    GetPano(newPosition, panorama);

    // toggle recap state
    setRecapState(false);
  };

  useEffect(() => {
    const startPosition = GetPosition();
    setActual(startPosition);
    setRound(1);
    setScore(0);

    // AIzaSyAngbtnimx927JnCrvxEx2ZvPUknY3bsoI
    // AIzaSyDtw4jIS0wrL1nl7HC50zDT-ZhMNx5Jb94
    const loader = new Loader({
      apiKey: "AIzaSyAngbtnimx927JnCrvxEx2ZvPUknY3bsoI",
      version: "weekly",
    });

    let newPano;
    let newMap;
    let newMarker;
    if (panorama == null) {
      console.log("creating panorama");
      loader
        .importLibrary("streetView")
        .then(({ StreetViewPanorama }) => {
          console.log("successfully loaded streetView library");
          console.log(startPosition);
          newPano = new StreetViewPanorama(document.getElementById("pano"), {
            position: startPosition,
            addressControl: false,
            zoomControl: false,
          });
          newPano.addListener("position_changed", () => {
            console.log(
              newPano.getPosition().lat() + ", " + newPano.getPosition().lng()
            );
          });
          // console.log(newPano);
          GetPano(startPosition, newPano);
          setPanorama(newPano);
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

    loader
      .importLibrary("marker")
      .then(({ AdvancedMarkerElement, PinElement }) => {
        if (mapMarker == null) {
          console.log("successfully loaded marker library");
          const pinStyle = new PinElement({
            background: "#258ac9",
            borderColor: "#0d6297",
            glyphColor: "#0d6297",
          });
          newMarker = new AdvancedMarkerElement({
            map,
            position: fenway,
            content: pinStyle.element,
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
          setMarker(newMarker);
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
            onClick={submitGuess}
          >
            Make Guess
          </button>
        ) : (
          <button className="game__guess-button" onClick={nextRound}>
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
