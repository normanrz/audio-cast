var sp = require("libspotify");
var cred = require("./spotify_key/passwd");
var lame = require("lame");
var fs = require("fs");

var spotify = {

  play : function() {
    var encoder = new lame.Encoder({
      channels: 2,        // 2 channels (left and right)
      bitDepth: 16,       // 16-bit samples
      sampleRate: 44100   // 44,100 Hz sample rate
    });

    var session = new sp.Session({
      applicationKey: __dirname + "/spotify_key/spotify_appkey.key"
    });
    session.login(cred.login, cred.password);
    session.once("login", function(err) {
      if(err) this.emit("error", err);

      var search = new sp.Search('artist:"bloc party" track:"flux"');
      search.trackCount = 1; // we"re only interested in the first result;
      search.execute();
      search.once("ready", function() {
        
        if(!search.tracks.length) {
          console.error("there is no track to play :[");
          session.logout();
        }

        var track = search.tracks[0];
        var player = session.getPlayer();
        player.load(track);
        player.play();

        // osx with `brew install sox`

        player.pipe(encoder);

        player.once("track-end", function() {
          console.error("track ended");
          player.stop();
          session.close();
        });

      });
    });

    return encoder;
  }
};

module.exports = spotify;