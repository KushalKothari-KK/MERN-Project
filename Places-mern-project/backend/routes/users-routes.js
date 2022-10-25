const express = require("express");
const { check } = require("express-validator");

const usersContollers = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", usersContollers.getUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(), // normailizeEmail Test@test.com => test@test.com
    check("password").isLength({ min: 6 }),
  ],
  usersContollers.signup
);

router.post("/login", usersContollers.login);

module.exports = router;
