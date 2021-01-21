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
const Day = require("./models/day.js");
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

  router.get("/user/consists", (req, res) => {
    User.findById(req.query.userid).then((user) => {
      res.send(user.consistency);
    });
  });

  router.post("/user/consistency", auth.ensureLoggedIn, (req, res) => {
    User.findOne({_id: req.user._id,}).then((user) => {
      user.push({consistency: req.body.consistency});
      user.save().then((updated) => {res.send(updated.user);
      });
    });
  });

  router.post("/day", (req, res) => {
    let response = {
      notes: null,
    };
    const startOfDay = moment(req.body.day).local().startOf("day");
    const endOfDay = moment(req.body.day).local().endOf("day");

    Journalentry.findOne({
      creator: req.user._id,
      timeCreated: {
        $gte: startOfDay.format(),
        $lte: endOfDay.format(),
      },
    }).then((n) => {
      // if it doesn't exist, create it!
      if (n) response.notes = n;
      else {
        newJournalentry = new Journalentry({
          creator: req.user._id,
          timeCreated: startOfDay,
        });
        newJournalentry.save();
        response["notes"] = newJournalentry;
      }
      res.send(response);
    });
  });

router.get("/journalentrieschanged", auth.ensureLoggedIn, (req,res) => {
  Journalentry.find({creator: req.user._id,}).then((journalentries) => res.send(journalentries));
});

router.post("/journalentries", auth.ensureLoggedIn, (req, res) =>{
  const newEntry = new Journalentry({
    creator: req.user._id,
    entries: req.body.entries,
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
