var express = require('express');
var os = require("os");
var spotify = require("./spotify");


var app = express();
app.listen("5553");

app.get("/ip", function(req, res) {
  var interfaces = os.networkInterfaces();
  var ip = interfaces["en0"].filter(function(item){ return item.family == "IPv4"})[0].address;
  res.send(ip);
});

app.get("/play", function(req, res) {
  res.pipe(spotify.play());
});

app.get("/", function(req, res) {
  spotify.play();
  res.send("<html><body><audio src=\"/http://localhost:5555\" controls></body></html>");
})