class ChatServer {
    constructor(port) {
        this.io = require('socket.io')(port);
        this.socket = null;
        console.log(`Chat listening on port ${port}!`);
    }

    handleGeneralChatMessage() {
        this.socket.on('chat message', function(msg) {
            database('localhost', 'PLI', function(err, db) {
                db.models.users.find({id: msg.user._id}, function(err, users) {
                    if (users[0] && !err) {
                        msg.user.avatar = users[0].link_photo;
                        msg.user.name = users[0].name + " " + users[0].lastname;
                        console.log(msg)
                        this.io.emit("chat message", msg)
                    }
                })
            });
        });
    }

    handleDisconnection() {
        this.socket.on('disconnect', function(){
            this.io.emit('chat message', {text: "Un utilisateur s'est deconnecté !"});
            console.log('user disconnected');
        });
    }

    run() {
        this.io.on('connection', function(socket){
            console.log('a user connected');
            this.io.emit('chat message', {text: "Un utilisateur s'est connecté !"});

            this.socket = socket;

            this.handleGeneralChatMessage();
            this.handleDisconnection();
        });
    }
}

module.exports = ChatServer;
