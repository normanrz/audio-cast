var express = require('express');
var os = require("os");
var fs = require("fs");
var spotify = require("./spotify");


var app = express();
app.listen("5553");

app.get("/ip", function(req, res) {
  var interfaces = os.networkInterfaces();
  var ip = interfaces["en0"].filter(function(item) { return item.family == "IPv4" })[0].address;
  res.send(ip);
});

app.get("/play", function(req, res) {
  res.setHeader("Content-Type", "audio/mpeg");
  player.pipe(res);
});

app.get("/", function(req, res) {
  res.send("<html><body><audio src=\"http://localhost:5555\" controls></body></html>");
})

var player = spotify.play();