"use strict";
const express = require('express');
const mysql = require('mysql');



var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'PLI',
    password : 'pli',
    port     : '8888',
    database : 'PLI'
});

class PostController {

    static create (req, res, next) {
        if(req.fields.length === 0 || req.files.length === 0)
            res.status(400).json("Error no data");
        else {
            console.log(req.body);
            console.log(req.files);
            console.log(req.fields);

            connection.connect();
            for (var item of req.fields.json){

                connection.query("INSERT INTO `posts`(`title`, `coordinate`, `description`, `link`, `date_pub`, `number_like`, `number_dislike`, `picture`) VALUES ("+item.title+","+item.coordinate+","+item.description+","+item.link+","+item.date_pub+","+item.number_like+","+item.number_dislike+","+req.files.file.path, function (error, results, fields) {
                    if (error) throw error;
                    console.log(results[0].solution);

                });
            }
            /connection.end();
            res.status(200).json("OK")
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
            for(var item of res){

            }
                //get file
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

module.exports = PostController;