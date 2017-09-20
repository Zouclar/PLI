/**
 * Created by MisterGreen on 19/09/2017.
 */
var express = require('express');
var router = express.Router();
const ctrl = require("../controllers/postController.js");

/* GET home page. */


router.post("/create", ctrl.create);
router.get("/all", ctrl.readAll);
router.get("/:id", ctrl.read);
router.delete("/:id", ctrl.delete);
router.put("/update/:id", ctrl.update);

module.exports = router;