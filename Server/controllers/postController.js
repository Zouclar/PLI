"use strict";
const express = require('express');
const mysql = require('mysql');

var database = require('../config/config.js');
var getTokenId = function () {
    return 1;
};

class PostController {

    static create (req, res, next) {
        console.log("CREATE ROUTE !!!")
        if(req.fields.length === 0 || req.files.length === 0)
            res.status(400).json("Error no data");
        else {
            console.log("THERE IS DATA !!!")
            console.log(req.body);
            console.log(req.files);
            console.log(req.fields);
            database('localhost', 'PLI', function(err, db) {
                if (err) throw err;
                console.log("CONNEXION GOOD uri ", req.files.image.path.replace("public/images/", ''))
                db.models.posts.create({
                    title          : req.fields.title,
                    coordinate     : {x: req.fields.longitude, y:req.fields.latitude},
                    description    : req.fields.description,
                    date_pub       : new Date(),
                    number_like    :0,
                    number_dislike :0,
                    picture        :req.files.image.path.replace("public/images/", '')
                    },
                    function(error, rows) {
                        if (error){
                            res.status(500).send("PAS OK")
                            console.log('pas ok', error.message)
                        }
                        else {
                            console.log("ok", rows)
                            res.status(200).send("OK")
                        }
                    }
                );
            });
        }
    }
    static read (req, res, next) {

        database('localhost', 'PLI', function(err, db) {
            if (err) throw err;
            console.log("one")
            db.models.posts.find({id: req.params.id_post}, function(err, rows) {

                var result = [];
                if(Object.keys(rows).length !== 0)
                    result = rows;

                res.status(200).json(result);
            });
        });
    }
    static like (req, res, next) {

        database('localhost', 'PLI', function(err, db) {
            if (err) throw err;
            db.models.likes.create({
                    id_owner   : Integer,
                    id_post    : req.params.id_post,
                    id_comment : null
                },
                function(error, rows) {
                    if (error){
                        res.status(403).send("Erreur Create User")
                        console.log('Erreur Create User', error.message)
                    }
                    else {
                        res.status(200).send("Success Create User")
                        console.log("Success Create User", rows)
                    }
                }
            );
        });
    }

    static download (req, res, next) {
        var file = './public/images/' + req.params.id_post;
        console.log('getting ./public/images/' + req.params.id_post)
        res.download(file); // Set disposition and send it.
    }
    // static upload (req, res, next) {
    //     res.status(200).json()
    // }
    static readAll (req, res, next) {
        database('localhost', 'PLI', function(err, db) {
            console.log("one for all")
            db.models.posts.find({}, function(err, rows) {
                var result = [];
                if(Object.keys(rows).length !== 0)
                    result = rows;

                console.log(typeof rows, rows)
                res.status(200).json(result)
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