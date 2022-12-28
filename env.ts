import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

export const SECRET = process.env.SECRET || "";
export const DB_URL = process.env.DB_URL || "";
