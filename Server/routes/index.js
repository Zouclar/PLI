var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/comments/:postID', function (req, res) {
    console.log("Hey, nice to see you !");
    var comments = [
        {
            content: "Superbe photo"
        },
        {
            content: "Génial, tout simplement"
        },
    ]
    res.setHeader('Content-Type', 'application/json');
    console.log(comments)
    res.json(comments);
});

module.exports = router;
