/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/
const express = require("express");
const moment = require("moment");
// import models so we can interact with the database
const User = require("./models/user");
const Journalentry = require("./models/journalentry.js");
const Tag = require("./models/tag.js");
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
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
/*Journalentry.deleteMany({})
  .then((err) => { 
    if(err) return console.log("no delete"); 
  console.log("delted")
  });*/
  
  router.get("/user", (req, res) => {
    User.findById(req.query.userid).then((user) => {
      res.send(user);
    });
  });

  router.post("/user/pettype", auth.ensureLoggedIn, (req, res) => {
    User.findOne({_id: req.user._id,}).then((user) => {
      user.petType = req.body.petType; 
      user.save().then((updated) => {res.send(updated.petType);
      });
    });
  });

router.get("/journalentrieschanged", auth.ensureLoggedIn, (req,res) => {
  let starting = moment(req.query.timestamp).startOf("day").format();
  let ending = moment(req.query.timestamp).endOf("day").format();
  Journalentry.findOne({
    creator: req.user._id, timeCreated: {
      $gte: starting,
      $lte: ending,},}).then((journalentries) => {
        if (journalentries) {
          res.send(journalentries);
        }
        else {
          res.send({});
        }
      });
});

router.get("/journalentriesday", auth.ensureLoggedIn, (req,res) => {
  const startOfDay = moment(req.body.timestamp).startOf("day").format();
  const endOfDay = moment(req.body.timestamp).endOf("day").format();

  Journalentry.findOne({
    creator: req.user._id,
    timeCreated: {
    $gte: startOfDay,
    $lte: endOfDay,},}).then((journalentries) => res.send(journalentries));
});

router.post("/journalentries", auth.ensureLoggedIn, (req, res) =>{
  Journalentry.findOne({
    creator: req.user._id,
    timeCreated: {
      $gte: req.body.startOfDay,
      $lte: req.body.endOfDay,
    },
  }).then((n) => {
    if (n) {
      n.entries = req.body.entries;
      n.save().then((updated) => {res.send(updated.entries);});
    }
    else {
      newJournalentry = new Journalentry({
        creator: req.user._id,
        entries: req.body.entries,
        timeCreated: req.body.startOfDay,
      });
      newJournalentry.save().then((journalentries) => res.send(journalentries));
    }
  });
  // const newEntry = new Journalentry({
  //   creator: req.user._id,
  //   entries: req.body.entries,
  //   timeCreated: startOfDay
  // });
  // newEntry.save().then((journalentries) => res.send(journalentries))
});

router.get("/tags", auth.ensureLoggedIn, (req,res) => {
  const startOfDay = moment(req.body.timestamp).startOf("day");
  const endOfDay = moment(req.body.timestamp).endOf("day");
  Tag.find({timeCreated: {
    $gte: startOfDay.toDate(), 
    $lt: endOfDay.toDate()},
    }).then((tags) => res.send(tags));
});

router.post("/tagger", auth.ensureLoggedIn, (req,res) => {
  const newTag = new Tag({
    creator: req.user._id,
    timeCreated: moment(req.body.day).local(), 
    content: req.body.content,
    });
  newTag.save().then((tags) => res.send(tags))
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