"use strict";
const express = require('express');
const mysql = require('mysql');


var database = require('../config/config.js');

class PostController {

    static create (req, res, next) {
        if(req.fields.length === 0 || req.files.length === 0)
            res.status(400).json("Error no data");
        else {
            console.log(req.body);
            console.log(req.files);
            console.log(req.fields);
            database('localhost', 'PLI', function(err, db) {
                if (err) throw err;
                console.log("CONNEXION GOOD")
                db.models.post.create({title: 'FirstPosition'}, function(err, rows) {

                });
            });

            res.status(200).json("OK")
        }
    }
    static read (req, res, next) {

        database('localhost', 'PLI', function(err, db) {
            if (err) throw err;

            db.models.post.find({foo: 'bar'}, function(err, rows) {

            });
        });
        res.status(200).json()
    }
    // static upload (req, res, next) {
    //     res.status(200).json()
    // }
    static readAll (req, res, next) {
        database('localhost', 'PLI', function(err, db) {
            if (err) throw err;

            // for(var item of )
                db.models.post.find({foo: 'bar'}, function(err, rows) {

                });
        });
        res.status(200).json()
    }

    static update (req, res, next) {
        res.status(200).json()
    }

    static delete (req, res, next) {
        res.status(200).json()
    }
}

module.exports = PostController;