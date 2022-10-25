//if working with google api
// const axios = require("axios");
// const HttpError = require("../models/http-error");
// const API_KEY = ''

// async function getCoordsForAddress(address) {
//   const response = await axios.get(
//     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//       address
//     )}&key=YOUR_API_KEY`
//   );
//   const data = response.data;

//   if (!data || data.status === "ZERO_RESULTS") {
//     const error = new HttpError(
//       "Could not find location for the specified address",
//       422
//     );
//     throw error;
//   }
//   const coordiantes = data.results[0].geometry.location;
//   return coordiantes
// }

//if not working with google api

async function getCoordsForAddress(address) {
  return {
    lat: 40.7484405,
    lng: -73.9856644,
  };
}

module.exports = getCoordsForAddress;
