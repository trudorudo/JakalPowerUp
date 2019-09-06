const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// console.log("inside models/box.js")
const boxSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  imageUrl: { type: String, required: true },
  lat: { type: String, required: true },
  lng: { type: String, required: true },
});
// console.log("Box Schema",boxSchema)
const Box = mongoose.model("Box", boxSchema);
// console.log(Box);
module.exports = Box;
