/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Journalentry = require("./models/journalentry.js");
// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }
  else{
    User.findOne({
      _id: req.user._id,}).then((user) => {res.send(user);});
  }
  //res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.post("/user/consistency", auth.ensureLoggedIn, (req,res) => {
  User.findOne({
    _id: req.user._id,}).then((user) => {
      user.consistency = req.body.consistency;
      user.save().then((updatedUser) => res.send(updatedUser));
    });
});

router.get("/journalentries", auth.ensureLoggedIn, (req,res) => {
  Journalentry.find({}).then((journalentries) => res.send(journalentries));
});

router.post("/journalentries", auth.ensureLoggedIn, (req, res) =>{
  const newEntry = new Journalentry({
    creator: req.user._id,
    content: req.body.content,

  });
  newEntry.save().then((journalentries) => res.send(journalentries))
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

router.get("/login", (req, res) => {
  //write the backend stuff
});

module.exports = router;
