/**
 * Created by MisterGreen on 20/09/2017.
 */
var orm = require("orm");
var connections = {};

function setup(db) {
    var Post = db.define("posts", {
        id             : { type: "integer", unique: true },
        title          : String,
        coordinate     : Point,
        description    : String,
        date_pub       : Date,
        number_like    : Number,
        number_dislike : Number,
        picture        : String
    }, {
        methods: {
            getPictureLink: function () {
                return this.link;
            }
        }
    });
    // var Shirt = db.define('shirt', ...);
    // Shirt.hasOne('user', User, ...);
}

module.exports = function(host, database, cb) {
    if (connections[host] && connections[host][database]) {
        return connections[host][database];
    }

    var opts = {
        host:     host,
        database: database,
        protocol: 'mysql',
        port:     '8888',
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
