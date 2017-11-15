var database = require('../config/config.js');

class ChatServer {
    constructor(port) {
        this.io = require('socket.io')(port);
        this.socket = null;
        console.log(`Chat listening on port ${port}!`);
        this.handleGeneralChatMessage = this.handleGeneralChatMessage.bind(this);
        this.handleConnection = this.handleConnection.bind(this);
        this.handleDisconnection = this.handleDisconnection.bind(this);
    }

    handleGeneralChatMessage(msg) {
            database('localhost', 'PLI', (err, db) => {
                db.models.users.find({id: msg.user._id}, (err, users) => {
                    if (users[0] && !err) {
                        msg.user.avatar = users[0].link_photo;
                        msg.user.name = users[0].name + " " + users[0].lastname;
                        this.io.emit("chat message", msg)
                    }
                })
            });
    }

    handleDisconnection() {
            this.io.emit('chat message', {text: "Un utilisateur s'est deconnecté !"});
            console.log('user disconnected');
    }

    handleConnection(socket) {
        console.log('a user connected');
        this.socket = socket;
        this.io.emit('chat message', {text: "Un utilisateur s'est connecté !"});


        this.socket.on('chat message', this.handleGeneralChatMessage);
        this.socket.on('disconnect', this.handleDisconnection);
    }

    run() {
        this.io.on('connection', this.handleConnection);
    }
}

module.exports = ChatServer;
