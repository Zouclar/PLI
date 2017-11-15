/**
 * Created by MisterGreen on 20/09/2017.
 */
var orm = require("orm");
var connections = {};

function setup(db) {
    var Post = db.define("posts", {
        id             : { type: "integer", unique: true },
        title          : String,
        coordinate     : { type: "point"},
        description    : String,
        date_pub       : Date,
        number_like    : Number,
        number_dislike : Number,
        picture        : String,
        user_id        : { type: "integer" }
    }, {
        methods: {
            getPictureLink: function () {
                return this.link;
            }
        }
    });
    var User = db.define("users", {
        id         : { type: "integer", unique: true },
        name       : String,
        lastname   : String,
        surname    : String,
        mail       : String,
        password   : String,
        link_photo : String
    }, {
        methods: {
            getPictureLink: function () {
                return this.link;
            }
        }
    });

    var Like = db.define("likes", {
        id         : { type: "integer", unique: true },
        id_owner   : { type: "integer", unique: false },
        id_comment : { type: "integer", unique: false },
        id_post    : { type: "integer", unique: false }
    }, {
        methods: {

        }
    });

    var Comment = db.define("comments", {
        id       : { type: "integer", unique: true },
        id_post  : { type: "integer", unique: true },
        id_owner : { type: "integer", unique: false },
        comment  : String,
        date     : { type: "date", time: true }
    }, {
        methods: {

        }
    });

    var Friend = db.define("friends", {
        id        : { type: "integer", unique: true },
        id_owner  : { type: "integer", unique: true },
        id_friend : { type: "integer", unique: false },
        is_friend : { type: "boolean"}
    }, {
        methods: {

        }
    });

    var Token = db.define("tokens", {
        id          : { type: "integer", unique: true },
        token       : String,
        expiration  : { type: "date", time: true },
        id_user  : { type: "integer" }
    }, {
        methods: {

        }
    });

    var Postview = db.define("postsview", {
        id             : { type: "integer", unique: true },
        title          : String,
        coordinate     : { type: "point"},
        description    : String,
        date_pub       : Date,
        picture        : String,
        countLikes     : Number,
        countComments  : Number
    }, {
        methods: {

        }
    });


}

module.exports = function(host, database, cb) {
    if (connections[host] && connections[host][database]) {
        cb(null, connections[host][database]);
        return;
    }

    var opts = {
        host:     host,
        database: database,
        protocol: 'mysql',
        port:     '3306',
        query:    {pool: true}
    };

    orm.connect(opts, function(err, db) {
        if (err) return cb(err);

        connections[host] = connections[host] || {};
        connections[host][database] = db;
        setup(db);
        cb(null, db);
    });
};
