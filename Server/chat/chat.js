var io = require('socket.io')();
io.on('connection', function(socket){
    console.log('a user connected');

    io.emit('chat message', "Un utilisateur s'est connecté !");
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function(){
        io.emit('chat message', "Un utilisateur s'est déconnecté !");
        console.log('user disconnected');
    });
});
io.listen(3000);
