import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

import {Map} from "./Components/Map";
import TopBar from "./nav/TopBar";
// import BottomBar from "./nav/BottomBar";

class App extends React.Component {
 
  // updateLoading = (isLoaded) => {this.setState({ loaded:isLoaded })}
  render(){
  return (
    <div style={{ height: "100%" }}>
      <TopBar />
      <Map/>
      {/* <BottomBar /> */}
    </div>
  );
  // }
  // else{
  //   console.log(this.state.map)
  //   return(
  //     <div>
  //       <PointSpreadLoading />
  //     </div>
  //   )
  // }
}
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
