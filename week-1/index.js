var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var SyllaRhyme = require('syllarhyme'); 

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        
        var original = msg
        var splitOriginal = original.split(" ");
        console.log(splitOriginal)
        splitOriginal.map(function (word) {
            SyllaRhyme(function(sr) {
                var rhymeArray = sr.rhymes(word)
                io.emit('chat message', msg);
                io.emit(rhymeArray);
            })
        })
    
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    
    // socket.on('chat message', function(msg, rhymeWords){
    //     io.emit('chat message', msg);
    //     io.emit('rhyme words', rhymeWords)
    //     console.log(rhymeWords)
    // });
});

io.emit('some event', { for: 'everyone' });

http.listen(3000, function(){
  console.log('listening on *:3000');
});

