const express = require("express");
const router = express.Router();
const ctrl = require('../../controllers/contacts')

// get all
router.get("/", ctrl.getAll);

// get by id
router.get("/:id", ctrl.getById);

// post new
router.post("/", ctrl.addContact);

// update by id
router.put("/:contactId", ctrl.updateById);

// delete by id
router.delete("/:contactId", ctrl.deleteById);

module.exports = router;
