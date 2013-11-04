var sp = require('./lib/libspotify');
var cred = require('./spotify_key/passwd');
var spawn = require('child_process').spawn;
var os = require('os');

var interfaces = os.networkInterfaces();
interfaces["en0"].filter(function(item){ return item.family == "IPv4"})[0].address;


var session = new sp.Session({
    applicationKey: __dirname + '/spotify_key/spotify_appkey.key'
});
session.login(cred.login, cred.password);
session.once('login', function(err) {
    if(err) this.emit('error', err);

    var search = new sp.Search('artist:"rick astley" track:"never gonna give you up"');
    search.trackCount = 1; // we're only interested in the first result;
    search.execute();
    search.once('ready', function() {
        if(!search.tracks.length) {
            console.error('there is no track to play :[');
            session.logout();
        }

        var track = search.tracks[0];
        var player = session.getPlayer();
        player.load(track);
        player.play();

        // linux
        //var play = spawn('aplay', ['-c', 2, '-f', 'S16_LE', '-r', '44100']);
        // osx with `brew install sox`
        var play = spawn('play', ['-r', 44100, '-b', 16, '-L', '-c', 2, '-e', 'signed-integer', '-t', 'raw', '-']);

        player.pipe(play.stdin);

        console.error('playing track. end in %s', track.humanDuration);
        player.on('data', function(buffer) {
            // buffer.length
            // buffer.rate
            // buffer.channels
            // 16bit samples
        });
        player.once('track-end', function() {
            console.error('track ended');
            player.stop();
            session.close();
        });
    });
});