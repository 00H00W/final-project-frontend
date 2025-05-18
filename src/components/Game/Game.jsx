import "./Game.css";
import { useState, useEffect, useRef, useMemo } from "react";
import {
  GetPosition,
  CalculateScoreValue,
  GetPano,
  loadGoogleApi,
} from "../../utils/GoogleAPI";
import Button from "../Button/Button";
import GameSummaryModal from "../Modals/GameSummaryModal/GameSummaryModal";
import ModalWithForm from "../Modals/ModalWithForm/ModalWithForm";
import Preloader from "../Preloader/Preloader";

function Game({ setActiveModal, isLoggedIn, postGameData }) {
  // map components
  const [panorama, setPanorama] = useState(null);
  const [map, setMap] = useState(null);
  const [mapMarker, setMarker] = useState(null);

  // game state
  const [guess, setGuess] = useState(null);
  const [actual, setActual] = useState(null);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [recapState, setRecapState] = useState(false);
  const [gameData, setGameData] = useState(null);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [mapGraphics, setMapGraphics] = useState([]);
  const [roundData, setRoundData] = useState({ distance: 0, score: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setScore(0);
    setRound(1);
    setSummaryModalOpen(false);
    const newPosition = GetPosition();
    setGuess(null);
    mapMarker.setMap(null);
    GetPano(newPosition, panorama).then((data) =>
      setActual(data.data.location.latLng)
    );
    setRecapState(false);
    setGameData(null);
    mapGraphics.forEach((item) => {
      item.setMap(null);
    });
    setMapGraphics([]);
  };

  const submitGuess = () => {
    // iterate score
    console.log(actual);
    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      guess,
      actual
    );
    const newScore = CalculateScoreValue(distance);
    setScore(score + newScore);
    setRoundData({ distance: distance, score: newScore });

    // draw map graphics
    // console.log(mapGraphics.length);
    mapGraphics.push(
      new google.maps.Polyline({
        map,
        path: [guess, actual],
        geodesic: false,
        strokeColor: "#FF0000",
        strokeWeight: 2,
      })
    );
    mapGraphics.push(
      new google.maps.Polyline({
        map,
        path: [guess, actual],
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 0.25,
        strokeWeight: 2,
      })
    );
    mapGraphics.push(
      new google.maps.marker.AdvancedMarkerElement({
        map,
        position: actual,
      })
    );
    const pinStyle = new google.maps.marker.PinElement({
      background: "#258ac9",
      borderColor: "#0d6297",
      glyphColor: "#0d6297",
    });
    mapGraphics.push(
      new google.maps.marker.AdvancedMarkerElement({
        map,
        position: guess,
        content: pinStyle.element,
      })
    );
    // console.log(mapGraphics.length);

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
      if (isLoggedIn) postGameData({ score: score, rounds: 5 });
      setGameData({ score: score, rounds: 5 });
      setSummaryModalOpen(true);
    } else {
      setRound(round + 1);

      // set new panorama position
      const newPosition = GetPosition();
      GetPano(newPosition, panorama).then((data) =>
        setActual(data.data.location.latLng)
      );
    }

    // toggle recap state
    setRecapState(false);
  };

  function displayDistance(distance) {
    if (distance <= 1000) return Math.round(distance) + " m";
    else return numberWithCommas(Math.round(distance / 100) / 10) + " km";
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // useEffect is called twice due to strict mode in dev environments
  // this can cause the initial round to be in an incorrect state
  useEffect(() => {
    console.log("testing");
    setIsLoading(true);
    loadGoogleApi(setActual, setGuess)?.then(({ panorama, map, marker }) => {
      setPanorama(panorama);
      setMap(map);
      setMarker(marker);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (isLoggedIn && gameData !== null) {
      postGameData(gameData);
    }
  }, [isLoggedIn]);

  return (
    <div className="game">
      {isLoading ? <Preloader /> : <></>}
      <div
        style={isLoading ? { visibility: "hidden" } : {}}
        className="game__pano"
        id="pano"
      >
        <div className="game__map-popout">
          <div
            className={`game__map-score${
              !recapState ? " game__map-score_hidden" : ""
            }`}
          >
            <p className="game__text">{displayDistance(roundData.distance)}</p>
            <p className="game__text">{`+${roundData.score} pts`}</p>
            <div className="game__distance-bar-background"></div>
            <div
              className="game__distance-bar"
              style={{
                width: 100 - roundData.distance / 200000 + "%",
              }}
            ></div>
          </div>

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
              {round === 5 ? "Finish" : "Next Round"}
            </button>
          )}
        </div>

        <div className="game__header">
          <p>Round: {round} / 5</p>
          <p>Score: {score}</p>
        </div>
      </div>
      <GameSummaryModal
        modalData={gameData}
        isOpen={summaryModalOpen}
        openModal={setActiveModal}
        isLoggedIn={isLoggedIn}
        resetGame={handleReset}
      ></GameSummaryModal>
    </div>
  );
}

export default Game;
