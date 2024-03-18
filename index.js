const express = require("express");
const cars = require("./data/cars.json");
const cors = require("cors");

const route = require("./route");

const app = express();
const port = 3000;
app.use(cors());

app.use(express.json());
// app.use(express.static("public"));
app.use("/", route);

app.listen(port, () => {
    console.log(`Server running on ${port}!`);
});