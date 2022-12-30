import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserInterface from "../interfaces/User";
import User from "./../models/User";
import admin from "./../helpers/firebase-config";

export const postSignUp = (req: Request, res: Response) => {
 const { value, error } = User.validate(req.body);
 if (!error) {
  bcrypt.hash(req.body.password, 12).then((hashedPassword) => {
   const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email,
    two_auth: req.body.two_auth,
   });
   return user.save();
  });
  //   console.log(req.body?.verification == "true" ? true : false);
  res.send("User added successfully!");
 } else {
  console.log(error.details);
  //   res.send(error.details);
 }
};

const sendResponse = async (
 jwt: any,
 token: any,
 res: Response,
 method: string
) => {
 console.log(token);
 res.status(200).send({
  token: jwt,
  user: {
   name: token.name,
   email: token.email,
   email_verified: token.email_verified,
   picture: token.picture,
   signInMethod: method,
   verification: token?.two_auth,
  },
 });
};

const firebaseLogin = async (req: Request, res: Response) => {
 try {
  const token = await admin.auth().verifyIdToken(req.body.data);
  if (token.email_verified) {
   User.findOne({ email: token.email }).then(async (user: UserInterface) => {
    if (!user) {
     const addUser = User({
      email: token.email,
      user_id: token.uid,
      name: token.name,
      signInMethod: "firebase",
     });
     await addUser.save();
     const jwt = User.generateAuthToken(addUser);
     sendResponse(jwt, token, res, "firebase");
    } else {
     console.log(token.uid, user);
     if (token.email == user.email) {
      const jwt = User.generateAuthToken(user);
      User.findOneAndUpdate(
       { email: token.email },
       { signInMethod: "firebase" },
       {
        new: true,
       },
       (err: any, doc: any) => (err ? console.log(err) : console.log(doc))
      );
      sendResponse(jwt, token, res, "firebase");
     }
    }
   });
  }
 } catch (err) {
  res.send(err);
 }
};

export const postLogin = (req: Request, res: Response) => {
 if (!req.body.data) {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);

  User.findOne({ email: email }).then((user: UserInterface) => {
   if (!user) {
    return res.status(401).send(`No user`);
   }
   bcrypt.compare(password, user?.password!).then((doMatch) => {
    if (!doMatch) {
     return res.status(401).send(`Wrong password`);
    }
    const token = User.generateAuthToken(user);
    User.findOneAndUpdate(
     { email: email },
     { signInMethod: "email" },
     {
      new: true,
     },
     (err: any) => console.log(err)
    );
    sendResponse(token, user, res, "email");
   });
  });
 } else {
  firebaseLogin(req, res);
 }
};
