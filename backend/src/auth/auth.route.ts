const router = require("express").Router();
const forbiddenMethod = require("../errors/methodNotAllowed");
const controller = require("./auth.controller");

router.route("/register").post(controller.create).all(forbiddenMethod);

module.exports = router;
