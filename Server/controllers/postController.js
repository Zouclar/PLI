"use strict";
const express = require('express');
const mysql = require('mysql');

var database = require('../config/config.js');

class PostController {

    static create (req, res, next) {
        console.log("CREATE ROUTE !!!")
        if(req.fields.length === 0 || req.files.length === 0)
            res.status(400).json("Error no data");
        else {
            database('localhost', 'PLI', function(err, db) {
                if (err) throw err;
                console.log("CONNEXION GOOD uri ", req.files.image.path.replace("public/images/", ''))
                db.models.posts.create({

                    user_id	       : res.id_user,
                    title          : req.fields.title,
                    coordinate     : {x: req.fields.longitude, y:req.fields.latitude},
                    description    : req.fields.description,
                    date_pub       : new Date(),
                    number_like    : 0,
                    number_dislike : 0,
                    picture        : req.files.image.path.replace("public/images/", '')
                    },
                    function(error, rows) {
                    if (error){
                        res.status(500).send("PAS OK")
                        console.log('pas ok', error.message)
                    }
                        else {
                        res.status(200).send("OK")
                        console.log("ok", rows)
                        }
                    }
                );
            });
        }
    }
    static read (req, res, next) {

        database('localhost', 'PLI', function(err, db) {
            if (err) throw err;

            db.models.posts.find({id: req.params.id_post}, function(err, postsRows) {
                var likes   = [];
                var comments = [];
                console.log("pr : ", postsRows)
                if (postsRows.length == 0) {
                    console.log("jene vais pas apparaitre et c relou")
                    res.status(404).json("Post not found");
                    return;
                }
                db.models.likes.find({id_post: postsRows[0].id}, function(err, likesRows) {
                    for(var item of likesRows)
                        likes.push(item);

                    db.models.comments.find({id_post: postsRows[0].id}, function(err, commentsRows) {
                        for(var item of commentsRows)
                            comments.push(item);

                        postsRows[0].likes    = likes;
                        postsRows[0].comments = comments;
                        res.status(200).json(postsRows);
                    });
                });
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
            db.models.posts.find({}).order("date_pub", "Z").all(function (err, postsRows) {

                let c = postsRows.length;
                let i = 0;
                let t = () => {
                    i ++;
                    if (i == c ){

                        let d = postsRows.length;
                        let y = 0;
                        let p = () => {
                            y ++;
                            if (y == d ){


                                res.status(200).json(postsRows);
                            }
                        }
                        if (postsRows.length == 0) {
                            console.log(1)

                            res.status(200).json([]);
                        }
                        for( var postRow of postsRows){
                            console.log("JES PASSER")
                            postRow.getComments(() => {
                                p();
                            })
                        }
                    }
                }

                if (postsRows.length == 0) {
                    res.status(200).json([]);
                }
                for( var postRow of postsRows){
                    console.log("JES PASSER")
                    postRow.getLikes(() => {
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

module.exports = PostController;
