var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/' , function(req, res) {
   res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('a user disconnected');
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    socket.on('typing', function (typing) {
        if(typing)
        {
            io.emit('typing');
            console.log("he type");
        }
        else
        {
            io.emit('nottyping');
            console.log("he stop type");
        }
    })
});
http.listen(3000, function () {
    console.log('Listening on 3000!')
});
