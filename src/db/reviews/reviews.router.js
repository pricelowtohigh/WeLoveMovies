const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:review_id").put(controller.update).delete(controller.delete).all(methodNotAllowed)

module.exports = router;