"use strict";
const express = require('express');
const mysql = require('mysql');

var database = require('../config/config.js');

class EventController {

    static create (req, res, next) {
        if(req.fields.length === 0 || req.files.length === 0)
            res.status(400).json("Error no data");
        else {
            // console.log(req.body);
            // console.log(req.files);
            // console.log(req.fields);
            database('localhost', 'PLI', function(err, db) {
                if (err) throw err;
                // console.log("CONNEXION GOOD uri ", req.files.image.path.replace("public/images/", ''))
                // console.log(res.id_user, req.fields.title, req.fields.longitude, req.fields.latitude, req.fields.description, req.fields.dateStart, req.fields.dateEnd);
                db.models.events.create({
		            user_id	            : res.id_user,
                    title               : req.fields.title,
                    coordinates          : {x: req.fields.longitude, y:req.fields.latitude},
                    description         : req.fields.description,
                    date_pub            : new Date(),
                    dateStart           : req.fields.dateStart,
                    dateEnd             : req.fields.dateEnd,
                    countLikes          :0,
                    countParticipate    :0,
                    countComments       :0,
                    picture             : req.files.image.path.replace("public/images/", '')
                    },
                    function(error, newEvent) {
                    if (error){
                        res.status(500).send("PAS OK")
                        console.log('pas ok', error.message)
                    }
                        else {
                        db.models.users.find({id: res.id_user}, function(err, user){
                            if (err) {
                            console.log(err); 
                            } else {
                            newEvent.addUsers(user, ()=>{
                                console.log("ADDED user to event...");
                                res.status(200).send("OK")
                                })
                            }
                        })
                        // rows.addUsers(,function())
                        // console.log("ok", rows)
                    }
                    }
                );
            });
        }
    }

/*    var Event = db.define("events", {
        id                  : { type: "integer", unique: true },
        title               : String,
        coordinate          : { type: "point"},
        description         : "value",  String,
        date_pub            : Date,
        dateStart           : Date,
        dateEnd             : Date,
        picture             : String,
        countLikes          : Number,
        countParticipate    : Number,
        countComments       : Number
    }, {
        methods: {

        }
    }); */





    static read (req, res, next) {

        database('localhost', 'PLI', function(err, db) {
            if (err) throw err;

            db.models.events.find({id: req.params.id_post}).first(function(err, postRow) {
                // var likes   = [];
                // var comments = [];
		if (postRow.length == 0) {
			console.log("jene vais pas apparaitre et c relou")
			res.status(404).json("Post not found");
			return;
		}
        postRow.getUsers(function() {
            res.status(200).json(postRow);
        });

                // db.models.likes.find({id_post: postsRows[0].id}, function(err, likesRows) {
                //     for(var item of likesRows)
                //         likes.push(item);

                //     db.models.comments.find({id_post: postsRows[0].id}, function(err, commentsRows) {
                //         for(var item of commentsRows)
                //             comments.push(item);

                //         postsRows[0].likes    = likes;
                //         postsRows[0].comments = comments;
                //         res.status(200).json(postsRows);
                //     });
                // });
            });
        });
    }

    static like (req, res, next) {
    	console.log('Gonna like')
    	console.log('Gonna like', res.id_user)
        database('localhost', 'PLI', function(err, db) {
            if (err) throw err;
            db.models.likes.create({
                    id_owner   : res.id_user,
                    id_post    : req.params.id,
                    id_comment : null
                },
                function(error, rows) {
                    if (error){
			console.log('Erreur Like Post', error.message)
			console.log("ERROR 500")
                        res.status(500).json("Erreur Like Post")
                    }
                    else {
                        res.status(200).json("Success Like Post")
                        console.log("Success Like Post", rows)
                    }
                }
            );
        });
    }	

    static download (req, res, next) {
        var file = './public/images/' + req.params.id;
        console.log('getting ./public/images/' + req.params.id)
        res.download(file); // Set disposition and send it.
    }

    static readAll (req, res, next) {
        database('localhost', 'PLI', function(err, db) {
            if (err) throw err;
            db.models.events.find({}).order("date_pub", "Z").all(function (err, postsRows) {

                let c = postsRows.length;
                let i = 0;
                let t = () => {
                    i ++;
                    if (i == c ){
                        res.status(200).json(postsRows);
                    }
                }

                if (postsRows.length == 0) {
                    res.status(200).json([]);
                }
                for( var postRow of postsRows){
                    postRow.getUsers( (e,y) => {
                        postRow.users = y;
                        t();
                    })
                }
            });
        });
    }

    static update (req, res, next) {
        res.status(200).json()
    }

    static delete (req, res, next) {
        res.status(200).json()
    }
}

module.exports = EventController;
