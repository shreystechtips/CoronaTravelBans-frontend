import firebase from "@firebase/app";
import "@firebase/storage";
import React, { useEffect } from "react";
import "../styles.css";
import ReactMapGL, { Layer } from "react-map-gl";

require("dotenv").config();
var firebaseConfig = {
  apiKey: "" + process.env.REACT_APP_API_KEY,
  authDomain: "corona-ban.firebaseapp.com",
  databaseURL: "https://corona-ban.firebaseio.com",
  projectId: "corona-ban",
  storageBucket: "corona-ban.appspot.com",
  messagingSenderId: "" + process.env.REACT_APP_MESSAGING_SENDER,
  appId: "" + process.env.REACT_APP_APP_ID,
  measurementId: "" + process.env.REACT_APP_MEAS_ID
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
let temp;
var gsReference = storage.refFromURL(
  "gs://corona-ban.appspot.com/parsed_data.json"
);

let result = [];
let value = [];
var top = 0;
const TOKEN = "" + process.env.REACT_APP_MAPBOX_TOKEN;
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
        top *= 1.25;
        return data;
      });
  });
}

class Map extends React.Component {
  state = {
    viewport: {
      latitude: 25,
      longitude: 5,
      zoom: 1,
      minzoom: 1,
      maxzoom: 8
    },
    result: [],
    layers: []
  };
  _onViewportChange = viewport => this.setState({ viewport });
  render() {
    const { viewport } = this.state;
    // let layers = [];
    let countryLayer = {
      //here we are adding a layer containing the tileset we just uploaded
      id: "countries", //this is the name of our layer, which we will need later
      source: {
        type: "vector",
        url: "" + process.env.REACT_APP_MAPBOX_MAP // <--- Add the Map ID you copied here
      },
      "source-layer": "" + process.env.REACT_APP_SOURCE_LAYER, // <--- Add the source layer name you copied here
      type: "fill",
      paint: {
        "fill-color": "#FF0000"
        // 'fill-opacity':['+', 0, ['number', ['get', 'ADM0_A3_IS'].concat(result).map(x => getOpacity(x)/2) , 0]]
      },
      filter: ["in", "ADM0_A3_IS"].concat(this.state.result),
      minzoom: 0,
      maxzoom: 5
    };
    let v = 1;
    if (!isLoaded) {
      getData().then(sk => {
        this.setState({
          result: sk.filter(s => s.bans.length > 0).map(a => a.ISO3)
        });
        var layerArray = [];
        var totalLayers = [];
        value.forEach(function (element) {
          if (!totalLayers.includes(element.ISO3)) {
            var addLayers = value
            .filter(s => s.bans.length === element.bans.length)
            .map(x => x.ISO3);
            let basicLayer = {
              //here we are adding a layer containing the tileset we just uploaded
              id: element.ISO3, //this is the name of our layer, which we will need later
              source: {
                type: "vector",
                url: "" + process.env.REACT_APP_MAPBOX_MAP // <--- Add the Map ID you copied here
              },
              "source-layer": "" + process.env.REACT_APP_SOURCE_LAYER, // <--- Add the source layer name you copied here
              type: "fill",
              paint: {
                "fill-color": "#FF0000",
                "fill-opacity": (element.bans.length * 1.0) / top
                // 'fill-opacity':['+', 0, ['number', ['get', 'ADM0_A3_IS'].concat(result).map(x => getOpacity(x)/2) , 0]]
              },
              filter: ["in", "ADM0_A3_IS"].concat(addLayers),
              minzoom: 0,
              maxzoom: 5
            };
            layerArray.push(<Layer key={basicLayer.id} {...basicLayer} />);
            totalLayers = totalLayers.concat(addLayers);
          }
        });

        this.setState({ layers: layerArray });
      });
    }
    return (
      <div style={{ height: "100%", position: "relative" }}>
        <ReactMapGL
          {...viewport}
          width="100vw"
          height="100vh"
          position="absolute"
          mapStyle="mapbox://styles/mapbox/dark-v10?optimize=true"
          mapboxApiAccessToken={TOKEN}
          onViewportChange={this._onViewportChange}
        >
          {/* <Layer {...countryLayer} /> */}
          {this.state.layers}
          {console.log(this.state.layers)}
        </ReactMapGL>
      </div>
    );
  }
}

export default Map;
