const express = require("express");
const router = express.Router();
const ctrl = require('../../controllers/contacts')
const {isValidId, validateBody} = require('../../middleware/index')
const {schemas} = require('../../models/contact') 

// get all
router.get("/", ctrl.getAll);

// // get by id
router.get("/:id", isValidId, ctrl.getById);

// // post new
router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

// // update by id
router.put("/:id", validateBody(schemas.addSchema), isValidId, ctrl.updateById);

router.patch("/:id/favorite", validateBody(schemas.addSchema), isValidId, ctrl.updateFavorite);

// // delete by id
router.delete("/:id", isValidId, ctrl.deleteById);

module.exports = router;
