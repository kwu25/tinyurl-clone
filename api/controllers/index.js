const express = require("express");
const router = express.Router();

// Load each controller
const urlController = require("./url.js");
const appConfigController = require("./appConfig.js");

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use("/urls", urlController);
router.use("/application-configuration", appConfigController);

module.exports = router;
