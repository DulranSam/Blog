const express = require("express");
const router = express.Router();
const basicFunctions = require("../controllers/basicFunctions");
const idFunctions = require("../controllers/idFunctions");

router.route("/").get(basicFunctions.GET).post(basicFunctions.POST);

router
  .route("/:id")
  .get(idFunctions.GET)
  .delete(idFunctions.DELETE)
  .put(idFunctions.PUT);

module.exports = router;
