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
    socket.on('chat message', function(data){
        io.emit('chat message', {
            message: data.message,
            username: data.username
        });
    });
    socket.on('typing', function (typing) {
        if(typing)
        {
            io.emit('typing');
        }
        else
        {
            io.emit('nottyping');
        }
    })
});
http.listen(3000, function () {
    console.log('Listening on 3000!')
});
