var database = require('../config/config.js');

module.exports = function (req, res, next) {
    const whitelist = ['/users/login', '/users/create'];

    if (whitelist.indexOf(req.path) > -1) {
        console.log("no authenticated route, next");
        return next();
    } else {
        let auth = req.get("authorization")
        if (!auth) {
            res.status(403).json("No token provided")
        }
        auth = auth.substr(7);
        database('localhost', 'PLI', function (err, db) {
            if (err) throw err;
            console.log("connected to db, checking token")
            db.models.tokens.find({token: auth},
                function (error, token) {
                    if (error) {
                        console.log('Erreur token', error.message)
                        res.status(403).json("Error token doesn't not exist")
                    }
                    else {
                        console.log("token: ", token[0].token)
                        var date_now = new Date();
                        if (date_now <= token[0].expiration) {
                            console.log("LOGIN OK, NEXT")
                            res.dbConnection = db;
                            res.id_user = token[0].id_user;
                            console.log("res.id_user is set")
                            return next();
                        } else {
                            console.log("Your token as expire")
                            res.status(401).json("Your token as expired")
                        }
                        ;
                    }
                })
        });
    }
    ;
    console.log("mw end exec");
}