const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateCreateItem = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": "Item name must be at least 2 characters",
      "string.max": "Item name must not exceed 30 characters",
      "any.required": "Item name is required",
    }),
    imageUrl: Joi.string().url().required().messages({
      "string.url": "Image URL must be a valid URL",
      "any.required": "Image URL is required",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const validationError = new Error(error.details[0].message);
    validationError.statusCode = 400;
    return next(validationError);
  }
  next();
};

const validateCreateUser = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name must not exceed 30 characters",
      "any.required": "Name is required",
    }),
    avatar: Joi.string().uri().required().messages({
      "string.uri": "Avatar must be a valid URL",
      "any.required": "Avatar URL is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().required().messages({
      "any.required": "Password is required",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const validationError = new Error(error.details[0].message);
    validationError.statusCode = 400;
    return next(validationError);
  }
  next();
};

const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().required().messages({
      "any.required": "Password is required",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const validationError = new Error(error.details[0].message);
    validationError.statusCode = 400;
    return next(validationError);
  }
  next();
};

const validateId = (req, res, next) => {
  const params = req.params || {};
  const id = params.itemId || params.userId || params.id;

  if (!id) {
    return next();
  }

  const schema = Joi.string().hex().length(24).required().messages({
    "string.hex": "ID must contain only hexadecimal characters (0-9, a-f)",
    "string.length": "ID must be exactly 24 characters long",
    "any.required": "ID is required",
  });

  const { error } = schema.validate(id);
  if (error) {
    const validationError = new Error(error.details[0].message);
    validationError.statusCode = 400;
    return next(validationError);
  }
  next();
};
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    weather: Joi.string().required().valid("hot", "warm", "cold").messages({
      "any.required": 'The "weather" field is required',
      "any.only": 'The "weather" field must be one of: hot, warm, cold',
      "string.empty": 'The "weather" field must be filled in',
    }),
  }),
});

module.exports = {
  validateCreateItem,
  validateCreateUser,
  validateLogin,
  validateId,
  validateURL,
  validateCardBody,
};
