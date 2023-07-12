const express = require("express");

const Joi = require("joi");

const contacts = require("../../models/contacts");

const router = express.Router();

const body = {
  name: "Aasdasdasd Asdads",
  email: "asd@asd.com",
  phone: "asd132123",
};

// const { name, email, phone } = body;

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

// get all
router.get("/", async (req, res, next) => {
  const allContacts = await contacts.listContacts();
  res.status(200).json(allContacts);
});

// get by id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const contactById = await contacts.getContactById(id);

  if (contactById) {
    res.status(200).json(contactById);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

// post new
router.post("/", async (req, res, next) => {
  const { error, value } = schema.validate(body);

  if (error) {
    // Validation failed
    const errorMessage = error.details[0].message;
    return res.status(400).json({ message: errorMessage });
  }

  const { name, email, phone } = value;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newContact = await contacts.addContact(body);

  res.status(201).json(newContact);
});

// delete by id
router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  const removeContact = await contacts.removeContact(contactId);
  if (removeContact) {
    res.status(200).json(removeContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

// update by id
router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  const { error, value } = schema.validate(body);

  if (error) {
    // Validation failed
    const errorMessage = error.details[0].message;
    return res.status(400).json({ message: errorMessage });
  }

  // const { name, email, phone } = value;

  if (!value) {
    res.status(400).json({ message: "missing fields" });
  } else {
    const updateContact = await contacts.updateContact(contactId, body);
    res.status(200).json(updateContact) ||
      res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
