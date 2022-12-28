import mongoose from "mongoose";
import { DB_URL } from "../env";

const startDB = () => {
 //  console.log(process.env);
 if (!DB_URL) {
  console.log("No DB_URL in environment. Unable to connect to database.....");
  return;
 }
 mongoose.connect(DB_URL).then(() => console.log(`Connected to Database...`));
};

export default startDB;
