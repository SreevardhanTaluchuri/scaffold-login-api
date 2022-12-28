import express, { Application } from "express";
import authRouter from "../routes/auth";

export default function (app: Application) {
 app.use(express.json());
 app.use("/api/auth", authRouter);
}
