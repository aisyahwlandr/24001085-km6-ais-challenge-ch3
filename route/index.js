const express = require("express");
const router = express.Router();
const carRoute = require("./car");

router.use("/", carRoute);

module.exports = router;