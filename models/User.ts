import jwt from "jsonwebtoken";
import Joi from "joi";
const mongoose = require("mongoose");
import { SECRET } from "./../env";
import UserInterface from "./../interfaces/User";

const userSchema = new mongoose.Schema({
 name: {
  type: String,
 },
 username: {
  type: String,
  //   required: true,
  minlength: 2,
  maxlength: 50,
 },
 email: {
  type: String,
  required: true,
  minlength: 5,
  maxlength: 255,
  unique: true,
 },
 password: {
  type: String,
  //   required: true,
  minlength: 5,
  maxlength: 1024,
 },
});

userSchema.statics.generateAuthToken = function (user: UserInterface) {
 console.log("AUTH TOKEN");
 const token = jwt.sign(
  {
   _id: user._id,
   username: user.username,
   email: user.email,
  },
  SECRET
 );
 return token;
};

userSchema.statics.validate = function (user: UserInterface) {
 const schema = Joi.object({
  username: Joi.string().min(5).max(50).required(),
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(5).max(255).required(),
 });

 return schema.validate(user);
};

const userModel = mongoose.model("User", userSchema);
export default userModel;
