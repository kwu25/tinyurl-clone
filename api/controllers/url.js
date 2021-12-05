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

//if alias given
////try to make entry in database
////if valid, return longUrl and alias that worked
////else say u fucked up

//if no alias
////keep making alias
////look up in url table if alias talken
////repeat until have alias not taken
////add longurl and genereated alias to database
////return longurl and alias

router.post("/", (req, res) => {
  const { longUrl } = req.body;
  let { alias } = req.body;

  // Only promises
  // if (!alias) {
  //   const choices = ["a", "b", "c", "d"];
  //   const x = ({ urlEntry, hash }) => {
  //     if (urlEntry != null) {
  //       hash = choices[Math.floor(Math.random() * choices.length)];
  //       return Url.findOne({ where: { alias: hash } }).then((uE) => {
  //         if (uE != null) {
  //           console.log("BAD HASH", hash);
  //         }
  //         return x({ urlEntry: uE, hash: hash });
  //       });
  //     }
  //     console.log("GOOD HASH", hash);
  //     return hash;
  //   };

  //   x({ urlEntry: "", hash: "" }).then((goodAlias) => {
  //     Url.create({
  //       longUrl: longUrl,
  //       alias: goodAlias,
  //     })
  //       .then((url) => {
  //         res.status(201).json(url);
  //       })
  //       .catch((err) => {
  //         res.status(400).json(err);
  //       });
  //   });
  // } else {
  //   Url.findOrCreate({
  //     where: { alias: alias },
  //     defaults: {
  //       longUrl: longUrl,
  //       alias: alias,
  //     },
  //   }).then(([url, created]) => {
  //     if (!created) {
  //       return res.sendStatus(409);
  //     }

  //     res.json(url);
  //   });
  // }

  //Using async and await. Good one
  const makeAlias = async () => {
    let urlEntry;
    do {
      alias = base62(8);
      urlEntry = await Url.findOne({ where: { alias: alias } });
    } while (urlEntry != null);

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
  };

  if (!alias) {
    makeAlias();
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

  // Original recipe but missing ingredients (doesnt handle collisions)
  // if (!alias) {
  //   alias = base62(8);
  //   Url.create({
  //     longUrl: longUrl,
  //     alias: alias,
  //   })
  //     .then((url) => {
  //       res.status(201).json(url);
  //     })
  //     .catch((err) => {
  //       res.status(400).json(err);
  //     });
  // } else {
  //   Url.findOrCreate({
  //     where: { alias: alias },
  //     defaults: {
  //       longUrl: longUrl,
  //       alias: alias,
  //     },
  //   }).then(([url, created]) => {
  //     if (!created) {
  //       return res.sendStatus(409);
  //     }

  //     res.json(url);
  //   });
  // }
});

module.exports = router;
