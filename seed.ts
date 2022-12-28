import mongoose from "mongoose";
import { DB_URL } from "./env";
import User from "./models/User";
import bcrypt from "bcrypt";

async function seed() {
 await mongoose.connect(DB_URL);

 bcrypt.hash("sreevardhan123", 12).then((hashedPassword) => {
  const user = new User({
   name: "Sreevardhan",
   username: "sreevardhan",
   password: hashedPassword,
   email: "sreevardhan@virinnovation.in",
  });
  return user.save();
 });

 console.info("Done!");
}

seed();
