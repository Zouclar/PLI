var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
const ctrl = require("../controllers/eventController.js");
const formidable = require('express-formidable');

/* GET home page. */

router.get("/", ctrl.readAll);
router.post("/join/:id", ctrl.join);
router.put("/like/:id/", ctrl.like);
router.get("/download/:id", ctrl.download);
router.get("/:id_post", ctrl.read);
router.delete("/:id", ctrl.delete);
router.put("/update/:id", ctrl.update);
router.post("/create", formidable({
    encoding: 'utf-8',
    uploadDir: '/Users/Zouclar/imagePLI'
}), ctrl.create);

module.exports = router;