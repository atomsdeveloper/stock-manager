const express = require("express");
const body_parser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();

const router = require("./app/routes/router.js");

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true // need send cookies or authentications headers 
}));

app.use(express.static(path.join(__dirname, './public')));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

app.use(router);

app.use(express.static(path.join(__dirname, './frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/build', 'index.html'));
});

module.exports = app;