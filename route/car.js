const express = require("express");
const router = express.Router();
const carController = require("../controller/car");

router.get("/", carController.getDefault);
router.get("/cars/", carController.getCars); // /cars
router.get("/cars/:id", carController.getCar); // /cars/:id
router.post("/cars/", carController.addCar); // /cars
router.put("/cars/:id", carController.updateCar); // /cars/:id
router.delete("/cars/:id", carController.deleteCar); // /cars/:id


module.exports = router;