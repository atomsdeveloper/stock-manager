const express = require("express");
const body_parser = require("body-parser");
const path = require("path");

const app = express();

const router = require("./app/routes/router.js");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './app/views'));

app.use(express.static(path.join(__dirname, './public')));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));
app.use(router);

module.exports = app;