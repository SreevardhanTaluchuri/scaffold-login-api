import express, { Request, Response, NextFunction } from "express";
import { SECRET } from "../env";
import jwt from "jsonwebtoken";

export const authUser = (req: Request, res: Response, next: NextFunction) => {
 console.log(req.headers);
 if (!req.headers.authorization)
  return res.status(401).send("Access denied. Authorization header missing.");
 if (req.headers.authorization.split(" ")[0] !== "Bearer")
  return res.status(401).send("Access denied. Only Bearer token is allowed.");
 const token = req.headers.authorization.split(" ")[1];
 if (!token) return res.status(401).send("Access denied. Token is missing.");
 try {
  const decoded = jwt.verify(token, SECRET);
  next();
 } catch (ex) {
  console.log(ex);
  res.status(400).send("Invalid token.");
 }
};
