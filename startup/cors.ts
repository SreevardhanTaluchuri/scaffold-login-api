import cors from "cors";
import express, { Application } from "express";

const startCors = (app: Application) => {
 app.use(cors());
};

export default startCors;
