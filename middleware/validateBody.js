const { HttpError } = require("../helpers");

const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  // console.log(schema);
  if (error) {
    next(HttpError(400, error.message));
  }
  next();
};

module.exports = validateBody;
