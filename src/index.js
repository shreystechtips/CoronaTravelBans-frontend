import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import ReactMapGL, { Layer } from "react-map-gl";
import { scaleLinear } from "d3-scale";
import TopBar from "./nav/TopBar";
import BottomBar from "./nav/BottomBar";

import firebase from "@firebase/app";
import "@firebase/storage";

require('dotenv').config();
var firebaseConfig = {
  apiKey: ""+process.env.REACT_APP_API_KEY,
  authDomain: "corona-ban.firebaseapp.com",
  databaseURL: "https://corona-ban.firebaseio.com",
  projectId: "corona-ban",
  storageBucket: "corona-ban.appspot.com",
  messagingSenderId: ""+process.env.REACT_APP_MESSAGING_SENDER,
  appId: ""+process.env.REACT_APP_APP_ID,
  measurementId: ""+process.env.REACT_APP_MEAS_ID
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
let temp;
var gsReference = storage.refFromURL(
  "gs://corona-ban.appspot.com/parsed_data.json"
);

var isLoaded = false;
function getData() {
  return gsReference.getDownloadURL().then(function (url) {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        isLoaded = true;
        value = data;
        result = data.filter(s => s.bans.length > 0).map(a => a.ISO3);
        value.forEach(element => {
          top = Math.max(element.bans.length, top);
        });
        return data;
      });
  });
}

function App() {
  return (
    <div style={{ height: "100%" }}>
      <TopBar />
      <MapChart />
      <BottomBar />
    </div>
  );
}

var top = 0;

var colorScale = scaleLinear().domain([0, top]).range(["#ffffff", "#ff0000"]);
function getOpacity(ISO3) {
  console.log(ISO3);
  try {
    console.log(test.find(s => s.ISO3 === ISO3).bans.length / top);
    return test.find(s => s.ISO3 === ISO3).bans.length / top;
  } catch (error) {
    console.log("yeet");
    return 0;
  }
}

let result = [];
let value;

function MapChart() {
  const TOKEN = ""+process.env.REACT_APP_MAPBOX_TOKEN
  console.log(process.env)
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "92vh",
    latitude: 25,
    longitude: 5,
    zoom: 1,
    minzoom: 1,
    maxzoom: 8
  });

  let countryLayer = {
    //here we are adding a layer containing the tileset we just uploaded
    id: "countries", //this is the name of our layer, which we will need later
    source: {
      type: "vector",
      url: ""+process.env.REACT_APP_MAPBOX_MAP // <--- Add the Map ID you copied here
    },
    "source-layer": ""+process.env.REACT_APP_SOURCE_LAYER, // <--- Add the source layer name you copied here
    type: "fill",
    paint: {
      "fill-color": "#FF0000"
      // 'fill-opacity':['+', 0, ['number', ['get', 'ADM0_A3_IS'].concat(result).map(x => getOpacity(x)/2) , 0]]
    },
    filter: ["in", "ADM0_A3_IS"].concat(result),
    minzoom: 0,
    maxzoom: 5
  };
  if (!isLoaded) {
    getData().then(sk => {
      console.log(value);
      console.log(isLoaded);
      countryLayer.filter = ["in", "ADM0_A3_IS"].concat(result);
    });
  }
  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/dark-v10?optimize=true"
      mapboxApiAccessToken={TOKEN}
      onViewportChange={viewport => {
        setViewport(viewport);
      }}
    >
      <Layer {...countryLayer} />
    </ReactMapGL>
  );

  // else {
  //   return (
  //     <ReactMapGL
  //       {...viewport}
  //       mapStyle="mapbox://styles/mapbox/dark-v9"
  //       mapboxApiAccessToken={TOKEN}
  //       onViewportChange={viewport => {
  //         setViewport(viewport);
  //       }}
  //     >
  //       <Layer {...countryLayer} />
  //     </ReactMapGL>
  //   );
  // }
  return (
    <div style={{ height: "92vh", width: "100vw", fontSize: "100" }}>
      Loading...
    </div>
  );
  // else {
  //   return (
  //     <div style={{ height: "92vh", width: "100vw", fontSize: "100" }}>
  //       Loading...
  //     </div>
  //   );
  // }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
