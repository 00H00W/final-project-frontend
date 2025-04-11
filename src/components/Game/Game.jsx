import "./Game.css";
import { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";

import { Loader } from "@googlemaps/js-api-loader";

function Game() {
  const fenway = { lat: 42.345573, lng: -71.098326 };

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyDtw4jIS0wrL1nl7HC50zDT-ZhMNx5Jb94",
      version: "weekly",
    });

    loader
      .importLibrary("streetView")
      .then(({ StreetViewPanorama }) => {
        console.log("successfully loaded streetView library");
        const panorama = new StreetViewPanorama(
          document.getElementById("pano"),
          {
            position: fenway,
            addressControl: false,
            zoomControl: false,
          }
        );
        panorama.addListener("position_changed", () => {
          //   const positionCell = document.getElementById("position-cell");

          //   positionCell.firstChild.nodeValue = panorama.getPosition() + "";
          console.log(panorama.getPosition().lat());
        });
      })
      .catch(console.error);

    loader
      .importLibrary("maps")
      .then(({ Map }) => {
        new Map(document.getElementById("map"), {
          center: fenway,
          zoom: 8,
          streetViewControl: false,
          gestureHandling: "greedy",
        });
      })
      .catch(console.error);
  }, []);

  return (
    <div className="game">
      <div className="game__pano" id="pano"></div>
      <div className="game__map" id="map"></div>
    </div>
  );
}

export default Game;
