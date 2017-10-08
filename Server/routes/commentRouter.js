/**
 * Created by MisterGreen on 19/09/2017.
 */
var express = require('express');
var router = express.Router();
const ctrl = require("../controllers/commentController.js");


router.post("/create/:id_post",ctrl.create);
router.get("/:id_post/all", ctrl.readAll);
router.get("/:id_comment", ctrl.read);
router.put("/like/:id_comment", ctrl.like);
// router.delete("/:id_comment", ctrl.delete);
router.put("/update/:id_comment", ctrl.update);

module.exports = router;