"use strict";
const express = require('express');

const mysql      = require('mysql');
var fs = require('file-system');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'PLI',
    password : 'pli',
    database : 'PLI'
});

class userController {

    static create (req, res, next) {
        if(req.fields.length === 0 || req.files.length === 0)
            res.status(400).json("Error no data");
        else {
            req.file.photo

            connection.connect();
            for (var item of req.fields){

                connection.query("INSERT INTO `posts`(`title`, `coordinate_x`, `coordinate_y`, `description`, `link`, `date_pub`, `number_like`, `number_dislike`, `picture`) VALUES ("+item.title+","+item.coordinate_x+","+item.coordinate_y+","+item.description+","+item.link+","+item.date_pub+","+item.number_like+","+item.number_dislike+","+item.pictures, function (error, results, fields) {
                    if (error) throw error;
                    console.log('The solution is: ', results[0].solution);

                    fs.writeFile('public/images/', 'aaa', function(err) {})
                });
            }
            connection.end();
            res.status(200).json()
        }
    }
    static read (req, res, next) {
        connection.connect();

        connection.query("SELECT * FROM posts WHERE id='" +req.params.id+ "'", function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results[0].solution);
            results[0].solution.link

        });

        connection.end();
        res.status(200).json()
    }
    // static upload (req, res, next) {
    //     res.status(200).json()
    // }
    static readAll (req, res, next) {
        connection.connect();

        connection.query("SELECT * FROM posts", function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results[0].solution);
            for(var item of res)
            get file
        });

        connection.end();
        res.status(200).json()
    }

    static update (req, res, next) {
        res.status(200).json()
    }

    static delete (req, res, next) {
        res.status(200).json()
    }
}

module.exports = CrimeController;