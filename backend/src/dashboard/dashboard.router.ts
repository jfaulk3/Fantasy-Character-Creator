const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./dashboard.controller");

router.route("/users").get(controller.read).all(methodNotAllowed);

module.exports = router;
export {};
