import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup
} from "react-simple-maps";
import test from './data/test.json';

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-50m-simplified.json";

var top = 0;
const data = test;
console.log(data);
test.forEach(element => {
  top = Math.max(element["bans"].length,top);
});
var colorScale = scaleLinear()
  .domain([0, top])
  .range(["#00f000", "#ff0000"]);

const MapChart = () => {
  var x = 1;
  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}
    >
      <ZoomableGroup zoom={1}>
        {data.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                const d = data.find(s => s["ISO3"] === geo.properties.ISO_A3);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={d ? colorScale(d["bans"].length) : "#F5F4F6"}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default MapChart;
