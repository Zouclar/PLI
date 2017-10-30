/**
 * Created by MisterGreen on 19/09/2017.
 */
var express = require('express');
var router = express.Router();
const ctrl = require("../controllers/postController.js");
const formidable = require('express-formidable');
/* GET home page. */


router.post("/create", formidable({
    encoding: 'utf-8',
    uploadDir: '/var/www/html'
}), ctrl.create);
router.put("/like/:id", ctrl.like);
router.get("/download/:id", ctrl.download);
router.get("/", ctrl.readAll);
router.get("/:id_post", ctrl.read);
router.delete("/:id", ctrl.delete);
router.put("/update/:id", ctrl.update);

module.exports = router;
