var database = require('../config/config.js');

class ChatServer {
    constructor(port) {
        this.io = require('socket.io')(port);
        console.log(`Chat listening on port ${port}!`);
        this.handleConnection = this.handleConnection.bind(this);
        this.handleDisconnection = this.handleDisconnection.bind(this);
        this.handleNewClient = this.handleNewClient.bind(this);
    }

    handleGeneralChatMessage(socket) {
        socket.on('chat message', (msg) =>{
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

    handleDisconnection(socket) {
        socket.on('disconnect', () => {
            this.io.emit('chat message', {text: "Un utilisateur s'est deconnecté !"});
            console.log('user disconnected');
        });
    }

    handleNewClient(socket) {
        socket.on('join', (data) => {
            console.log("client " +  data.id + " join")
            socket.join(data.id); // We are using room of socket io
        });
    }

    handlePrivateChatMessage(socket) {
        socket.on('private message', (msg) => {
            database('localhost', 'PLI', (err, db) => {
                db.models.users.find({id: msg.user._id}, (err, users) => {
                    if (users[0] && !err) {
                        msg.user.avatar = users[0].link_photo;
                        msg.user.name = users[0].name + " " + users[0].lastname;
                        console.log(msg.user._id + " send msg to " + msg.user.target)
                        this.io.sockets.in(msg.user.target).emit('private message', msg);
                        this.io.sockets.in(msg.user._id).emit('private message', msg);
                        this.io.to(msg.user.target).emit('private message', msg);
                        this.io.to(msg.user._id).emit('private message', msg);
                        socket.broadcast.to(msg.user._id).emit('private message', msg);
                    }
                })
            });
        })
    }

    handleConnection(socket) {
        console.log('a user connected');
        this.io.emit('chat message', {text: "Un utilisateur s'est connecté !"});

        this.handleNewClient(socket);

        this.handlePrivateChatMessage(socket);
        this.handleGeneralChatMessage(socket);
        this.handleDisconnection(socket);
    }

    run() {
        this.io.sockets.on('connection', this.handleConnection);
    }
}

module.exports = ChatServer;