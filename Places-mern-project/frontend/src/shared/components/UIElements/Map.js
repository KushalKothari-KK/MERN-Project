import React, { useEffect, useRef } from "react";

import "./Map.css";

const Map = (props) => {
  const mapRef = useRef();

  //   if have key for googlemap

  const { center, zoom } = props;

  useEffect(() => {
    new window.ol.Map({
      target: mapRef.current.id,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM(),
        }),
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });
  }, [center, zoom]);

  // google maps
  // useEffect(() => {
  //   const map = new window.google.maps.Map(mapRef.current, {
  //     center: center,
  //     zoom: zoom,
  //   });
  //   new window.google.maps.Marker({ position: center, map: map });
  // }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Map;
