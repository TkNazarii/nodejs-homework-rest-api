const { Contact } = require("../models/contact");
const { schemas } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  //   const result = await Contact.find({name: '11111111111111 Pope'}); //пошук за назвою
  //   const result = await Contact.find({name: 'Wor'}, 'name email' ); //поверне тільки певні поля
  //   const result = await Contact.find({name: 'Wor'}, '-name -email' ); //не повертати ці поля
  res.status(200).json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  //   const result = await Contact.findOne({_id: id});
  const result = await Contact.findById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(400, "Not faund");
  }
  res.json(result);
};

const updateFavorite = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(400, "Not faund");
  }
  res.json(result);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);

  if (!result) {
    throw HttpError(400, "Not found");
  }
  res.json({ message: "Delete Success" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
