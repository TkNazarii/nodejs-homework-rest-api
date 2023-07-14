const express = require("express");
const Joi = require("joi");
const contacts = require("../../models/contacts");
const router = express.Router();
const { HttpError } = require("../../helpers");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

// get all
router.get("/", async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.status(200).json(allContacts);
  } catch (error) {
    next(error);
  }
});

// get by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);

    if (!result) {
      throw HttpError(404, "Not found");
      // const error = new Error('Not Found');
      // error.status = 404;
      // throw error
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
    // const { status = 500, message = 'Server error' } = error
    // res.status(status).json({
    // 	message,
    // });
  }
});

// post new
router.post("/", async (req, res, next) => {
  // console.log(req.body);

  try {
    const { error } = schema.validate(req.body);
    // console.log(error.message);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// update by id
router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);

    if (!result) {
      throw HttpError(400, "Not faund");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// delete by id
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

    if (!result) {
      throw HttpError(400, "Not found");
    }
    res.json({ message: "Delete Success" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
