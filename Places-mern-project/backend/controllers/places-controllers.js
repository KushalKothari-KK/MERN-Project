const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/place");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    address: "20 W 34th St., New York, NY 10001, United States",
    creator: "u1",
  },
];

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid; //{pid:p1}
  let place;
  try {
    place = await Place.findById(placeId); //mongoose
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place",
      500
    ); //if get request has some problem
    return next(error);
  }

  // const place = DUMMY_PLACES.find((p) => {
  //   return p.id === placeId;
  // }); for Dummy array

  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided id.",
      404
    ); //if get works fine but do not have placeid
    return next(error);
  }

  // res.json({ place }); // => {place} => {place:place}
  res.json({ place: place.toObject({ getters: true }) }); // for mongoose getters returns id as stirng
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  // const places = DUMMY_PLACES.filter((p) => {
  //   return p.creator === userId;
  // });for Dummy array

  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place",
      500
    );
    return next(error);
  }
  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find places for the provided user id.", 404)
    );
  }
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  // check if express-validator showing error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }
  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: "https://picsum.photos/200/300",
    creator,
  });
  try {
    await createdPlace.save(); //for mongoose
  } catch (err) {
    const error = new HttpError("Creating Place failed,please try again.", 500);
    return next(error);
  }
  // DUMMY_PLACES.push(createdPlace); for Dummy array
  res.status(201).json({ place: createdPlace }); //if adding something new 201
};

const updatePlaceById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(errors);
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  // const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  // const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  let place;
  try {
    place = await Place.findById(placeId); //mongoose
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place",
      500
    ); //if get request has some problem
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  // DUMMY_PLACES[placeIndex] = updatedPlace;
  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong,could not delte place.",
      500
    );
    return next(error);
  }
  try {
    await place.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }
  res.status(200).json({ message: "Deleted place." });
};

// for dummy array
// const deletePlace = (req, res, next) => {
//   const placeId = req.params.pid;
//   if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
//     throw new HttpError("Could not find a place for the id.", 404);
//   }
//   DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
//   res.status(200).json({ message: "Deleted place." });
// };

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlace = deletePlace;
