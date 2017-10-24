/**
 * Created by MisterGreen on 19/09/2017.
 */
var express = require('express');
var router = express.Router();
const ctrl = require("../controllers/postController.js");

/* GET home page. */


router.post("/create", ctrl.create);
router.post("/:id_post/like", ctrl.like);

router.get("/all", ctrl.readAll);
router.get("/:id_post", ctrl.read);


router.get("/download/:id", ctrl.download);
router.delete("/:id_post", ctrl.delete);
router.put("/update/:id_post", ctrl.update);

module.exports = router;