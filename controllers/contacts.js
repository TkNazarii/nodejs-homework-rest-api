const Joi = require("joi");
const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const getAll = async (req, res, next) => {
	// try {
	  const allContacts = await contacts.listContacts();
	  res.status(200).json(allContacts);
	// } catch (error) {
	//   next(error);
	// }
  };

const getById = async (req, res, next) => {

	  const { id } = req.params;
	  const result = await contacts.getContactById(id);
  
	  if (!result) {
		throw HttpError(404, "Not found");
	  }
  
	  return res.status(200).json(result);
  }

const addContact = async (req, res, next) => {

	  const { error } = schema.validate(req.body);
	  if (error) {
		throw HttpError(400, error.message);
	  }
	  const result = await contacts.addContact(req.body);
	  res.status(201).json(result);
  }

const updateById = async (req, res, next) => {

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
  }

const deleteById = async (req, res, next) => {
	
	  const { contactId } = req.params;
	  const result = await contacts.removeContact(contactId);
  
	  if (!result) {
		throw HttpError(400, "Not found");
	  }
	  res.json({ message: "Delete Success" });
  }

  module.exports = {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	addContact: ctrlWrapper(addContact),
	updateById: ctrlWrapper(updateById),
	deleteById: ctrlWrapper(deleteById),
  }