var database = require('../config/config.js');

class ChatServer {
    constructor(port) {
        this.io = require('socket.io')(port);
        this.socket = null;
        console.log(`Chat listening on port ${port}!`);
        this.handleConnection = this.handleConnection.bind(this);
        this.handleDisconnection = this.handleDisconnection.bind(this);
        this.handleNewClient = this.handleNewClient.bind(this);
    }

    handleGeneralChatMessage() {
        this.socket.on('chat message', (msg) =>{
            database('localhost', 'PLI', (err, db) => {
                db.models.users.find({id: msg.user._id}, (err, users) => {
                    if (users[0] && !err) {
                        msg.user.avatar = users[0].link_photo;
                        msg.user.name = users[0].name + " " + users[0].lastname;
                        this.io.emit("chat message", msg)
                    }
                })
            });
        });
    }

    handleDisconnection() {
        this.socket.on('disconnect', () => {
            this.io.emit('chat message', {text: "Un utilisateur s'est deconnecté !"});
            console.log('user disconnected');
        });
    }

    handleNewClient() {
        this.socket.on('join', (data) => {
            this.socket.join(data.userId); // We are using room of socket io
        });
    }

    handlePrivateChatMessage() {
        this.socket.on('private message', (msg) => {
            database('localhost', 'PLI', (err, db) => {
                db.models.users.find({id: msg.user._id}, (err, users) => {
                    if (users[0] && !err) {
                        msg.user.avatar = users[0].link_photo;
                        msg.user.name = users[0].name + " " + users[0].lastname;
                        this.io.sockets.in(msg.target).emit('private message', msg);
                    }
                })
            });
        })
    }

    handleConnection(socket) {
        console.log('a user connected');
        this.socket = socket;
        this.io.emit('chat message', {text: "Un utilisateur s'est connecté !"});

        this.handleNewClient();

        this.handlePrivateChatMessage();
        this.handleGeneralChatMessage();
        this.handleDisconnection();
    }

    run() {
        this.io.on('connection', this.handleConnection);
    }
}

module.exports = ChatServer;
