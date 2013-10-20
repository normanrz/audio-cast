global.DIR = process.env.PWD || __dirname;
global.PORT = process.env.PORT || 5000;

global.APP_KEY = process.env.APP_KEY;


/* Application */

var app = require("./app/application.js");


/* Routing */
// Pages
app.get("/receiver", function(req, res, next) {
  res.render(__dirname + "/views/receiver.ejs", { appKey : process.env.APP_KEY });
});

app.get("/sender", function(req, res, next) {
  res.render(__dirname + "/views/sender.ejs", { appKey : process.env.APP_KEY });
});

app.get("/video.mp4", function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.sendfile("/static/video.mp4", {root : __dirname});
});


/* Leader */
app.listen(global.PORT, function() {
  console.log("Listening on " + global.PORT);
});
