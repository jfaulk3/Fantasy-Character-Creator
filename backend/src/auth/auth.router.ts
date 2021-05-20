const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const validInfo = require("../middleware/validInfo");
const controller = require("./auth.controller");

router
  .route("/register")
  .post(validInfo, controller.create)
  .all(methodNotAllowed);
router.route("/login").post(validInfo, controller.login).all(methodNotAllowed);

router.route("/is-verify").get(controller.isVerified).all(methodNotAllowed);

module.exports = router;
export {};
