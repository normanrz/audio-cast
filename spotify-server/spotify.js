var sp = require("libspotify");
var cred = require("./spotify_key/passwd");
var lame = require("lame");
var ogg = require("ogg");
var vorbis = require("vorbis");
var spawn = require('child_process').spawn;
var fs = require("fs");

var spotify = {

  play : function() {
    var session = new sp.Session({
      applicationKey: __dirname + "/spotify_key/spotify_appkey.key"
    });
    session.login(cred.login, cred.password);
    session.once("login", function(err) {
        if(err) this.emit("error", err);

        var search = new sp.Search('artist:"rick astley" track:"never gonna give you up"');
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
            var play = spawn("play", ["-r", 44100, "-b", 16, "-L", "-c", 2, "-e", "signed-integer", "-t", "raw", "-"]);

            var oggEncoder = new ogg.Encoder();
            var vorbisEncoder = new vorbis.Encoder();
            var ws = fs.createWriteStream("ricky.ogg");

            player.pipe(vorbisEncoder);

            vorbisEncoder.on("stream", function(stream) {
                console.log("hm...");
                stream.pipe(oggEncoder.stream)
            })
            // vorbisEncoder.pipe(oggEncoder);
            oggEncoder.pipe(process.stdout);

            player.once("track-end", function() {
                console.error("track ended");
                player.stop();
                session.close();
            });

        });
    });
  }
};

module.exports = spotify;