const express = require("express");
const router = express.Router();
const db = require("../models");
const { Url } = db;

const base62 = require("base62-random");
// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /
//    POST   /urls
//    GET    /urls/:id

router.get("/", (req, res) => {
  Url.findAll({}).then((urls) => res.json(urls));
});

router.get("/:alias", (req, res) => {
  const { alias } = req.params;
  Url.findOne({ where: { alias: alias } }).then((url) => {
    if (!url) {
      return res.sendStatus(404);
    }

    res.json(url);
  });
});

router.post("/", (req, res) => {
  const { longUrl } = req.body;
  let { alias } = req.body;
  if (!alias) {
    alias = base62(8);
    Url.create({
      longUrl: longUrl,
      alias: alias,
    })
      .then((url) => {
        res.status(201).json(url);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    Url.findOrCreate({
      where: { alias: alias },
      defaults: {
        longUrl: longUrl,
        alias: alias,
      },
    }).then(([url, created]) => {
      if (!created) {
        return res.sendStatus(409);
      }

      res.json(url);
    });
  }
});

module.exports = router;
