const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { isValidId, validateBody, authenticate } = require("../../middleware/index");
const { schemas } = require("../../models/contact");

// get all
router.get("/", authenticate, ctrl.getAll);

// // get by id
router.get("/:id", authenticate, isValidId, ctrl.getById);

// // post new
router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.addContact);

// // update by id
router.put("/:id", authenticate, validateBody(schemas.updateFavoriteSchema), isValidId, ctrl.updateById);

router.patch("/:id/favorite", authenticate, validateBody(schemas.updateFavoriteSchema), isValidId, ctrl.updateFavorite);

// // delete by id
router.delete("/:id", authenticate, isValidId, ctrl.deleteById);

module.exports = router;
