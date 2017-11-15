export default class ChatServer {
    constructor(port) {
        var io = require('socket.io')(port);
        console.log(`Chat listening on port ${port}!`);
    }

    run() {
        io.on('connection', function(socket){
            console.log('a user connected');

            io.emit('chat message', {text: "Un utilisateur s'est connecter !"});
            socket.on('chat message', function(msg){
                console.log('msg: ');
                console.log(msg);
                database('localhost', 'PLI', function(err, db) {
                    db.models.users.find({id: msg.user._id}, function(err, users) {
                        if (users[0] && !err) {
                            console.log("user found")
                            console.log(users[0])
                            msg.user.avatar = users[0].link_photo;
                            msg.user.name = users[0].name + " " + users[0].lastname;
                            console.log(msg)
                            io.emit("chat message", msg)
                        }
                    })
                });
            });
            socket.on('disconnect', function(){
                io.emit('chat message', {text: "Un utilisateur s'est deconnecter !"});
                console.log('user disconnected');
            });
        });
    }
}


