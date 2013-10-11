/* Theater */

global.DIR = process.env.PWD || __dirname;
global.PORT = process.env.PORT || 5000;


/* Application */

var app = require("./app/application.js");


/* Routing */
// Pages
app.get("/receiver", function(req, res, next) {
  res.render(__dirname + "/views/receiver.ejs");
});


/* Leader */
app.listen(global.PORT, function() {
  console.log("Listening on " + global.PORT);
});
