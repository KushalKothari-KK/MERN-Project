const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  }, //unique for internal to speedup finding
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  image: {
    type: String,
    required: true,
  },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }],
  //to tell mongoose we have multiple data using []
});

userSchema.plugin(uniqueValidator); //query to fast email validator

module.exports = mongoose.model("User", userSchema);
