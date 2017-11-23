"use strict";
const express = require('express');

// const mysql = require('mysql');
// var fs = require('file-system');

var database = require('../config/config.js');
var getTokenId = function () {
    return 1;
};

class CommentController {

    static create (req, res, next) {

        //todo save photo and LINK
        if(!req.body.comment){
            res.status(400).json("Erreur in body request, body should not be empty");
        }else{
            database('localhost', 'PLI', function(err, db) {
                // BIGTODO => INCLUDE MOMENT JS POUR LA DATE DANS LE CREATE;
                if (err) throw err;
                var id_owner = res.id_user;
                db.models.comments.create({
                        id_post  : req.params.id_post,
                        id_owner : id_owner,
                        comment  : req.body.comment,
                        date     : "2017-01-01 12:00:00"
                    },
                    function(error, rows) {
                        if (error){
                            res.status(500).json("Erreur Create Comment")
                            console.log('Erreur Create Comment', error.message)
                        }
                        else {
                            res.status(200).json("Success Create Comment")
                            console.log("Success Create Comment", rows)
                        }
                    }
                );
            });
        }
    }

    static read (req, res, next) {
        //should get IN VIEW COMMENT
        database('localhost', 'PLI', function(err, db) {
            if (err) throw err;
            console.log(req.params.id_comment);
            db.models.comments.find({id: req.params.id_comment}, function(err, row) {
                console.log(row);

                res.status(200).json(row[0]);
            });
        });
    }

    static readAll (req, res, next) {
        //should get IN VIEW COMMENT
        database('localhost', 'PLI', function(err, db) {
            if (err) throw err;
            db.models.comments.find({id_post: req.params.id_post}, function (err, commentsRows) {

                let c = commentsRows.length;
                let i = 0;
                let t = () => {
                    i ++;
                    if (i == c ){
                        res.status(200).json(commentsRows);
                    }
                }

                if (commentsRows.length == 0) {
                    res.status(200).json([]);
                }
                for( var commentRow of commentsRows){
                    console.log("LIKE PASSER")
                    commentRow.getOwner(() => {
                        t();
                    })
                }
            });
        });
    }

    static like (req, res, next) {

        database('localhost', 'PLI', function(err, db) {
            if (err) throw err;
            var id_owner = getTokenId();
            db.models.likes.create({
                    id_owner   : id_owner,
                    id_comment : req.params.id_comment,
                    id_post    : null
                },
                function(error, rows) {
                    if (error){
                        console.log('Erreur Like Comment', error.message);
                        res.status(500).send("Erreur Like Comment");
                    }
                    else {
                        console.log("Success Like Comment", rows);
                        res.status(200).send("Success Like Comment");
                    }
                }
            );
        });
    }

    static update (req, res, next) {
        if(req.body.comment === undefined){
            res.status(400).send("Erreur in body request, body.comment should not be empty");
        }
        else{
            database('localhost', 'PLI', function(err, db) {
                if (err) throw err;
                db.models.comments.find({id: req.params.id_comment}, function(err, row) {

                    //row[0].date = momentJS(now);
                    row[0].comment = req.body.comment;
                    row[0].save(function (err) {
                        if(err) res.status(500).send("Error while update comment, err: ", err);
                        res.status(200).send("Update is a success");
                    });
                });
            });
        }
    }

    static delete (req, res, next) {
        res.status(200).json()
    }
}

module.exports = CommentController;
