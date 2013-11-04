var dir = global.DIR,
    app = global.app,
    fs = require('fs');

app.get('/robots.txt', function(req, res, next){
  fs.readFile(dir + '/static/robots.txt', function (err, file) {
      if (err) { console.log(err); }
      res.end(file);      
  });
});
app.get('/humans.txt', function(req, res, next){
  fs.readFile(dir + '/static/humans.txt', function (err, file) {
      if (err) { console.log(err); }
      res.end(file);      
  });
});
app.get('/crossdomain.xml', function(req, res, next){
  fs.readFile(dir + '/static/crossdomain.xml', function (err, file) {
      if (err) { console.log(err); }
      res.end(file);      
  });
});
