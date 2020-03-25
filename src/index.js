import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { scaleLinear } from "d3-scale";

import Map from "./Components/Map";
import TopBar from "./nav/TopBar";
import BottomBar from "./nav/BottomBar";

function App() {
  return (
    <div style={{ height: "100%" }}>
      <TopBar />
      <Map />
      {/* <BottomBar /> */}
    </div>
  );
}

// var colorScale = scaleLinear().domain([0, top]).range(["#ffffff", "#ff0000"]);
// function getOpacity(ISO3) {
//   console.log(ISO3);
//   try {
//     console.log(test.find(s => s.ISO3 === ISO3).bans.length / top);
//     return test.find(s => s.ISO3 === ISO3).bans.length / top;
//   } catch (error) {
//     console.log("yeet");
//     return 0;
//   }
// }

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
