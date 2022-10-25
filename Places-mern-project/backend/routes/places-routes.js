const express = require("express");
const { check } = require("express-validator");

const placesContollers = require("../controllers/places-controllers");

const router = express.Router();

// "/" will be added after /api/places

//routes order matters

// next() for async code
// throw for sync code

router.get("/:pid", placesContollers.getPlaceById);

router.get("/user/:uid", placesContollers.getPlacesByUserId);

// goes from left to right middleware
router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesContollers.createPlace
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesContollers.updatePlaceById
);

router.delete("/:pid", placesContollers.deletePlace);

module.exports = router;
