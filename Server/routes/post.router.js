const ctrl = require("../controller/post.controller.js");
const mw = require("../middleware/auth.middleware");
const express = require('express');
const router = express.Router();

router.put("/post/:id", mw.mustBeConnected, ctrl.update);
router.get("/post/:id", mw.mustBeAgent, ctrl.read);

module.exports = router;