const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const apiRoutes = require("./routes/api");
const htmlRoutes = require("../routes/htmljs");

app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
});