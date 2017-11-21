/**
 * Created by MisterGreen on 19/09/2017.
 */
var passport = require("passport"); 
var express = require('express');
var jwt = require('jsonwebtoken');  
var expressJwt = require('express-jwt');
var router = express.Router();
const ctrl = require("../controllers/userController.js");


router.post("/login", ctrl.login);
router.post("/create",ctrl.create);

router.get("/friends", ctrl.readAll);
router.put("/friends/ask/:id_friend", ctrl.askFriend);
router.put("/friends/accept/:id_friend", ctrl.acceptFriend);

router.get("/all", ctrl.readAll);
router.get("/:id", ctrl.read);



router.delete("/:id", ctrl.delete);
router.put("/update/:id", ctrl.update);


module.exports = router;