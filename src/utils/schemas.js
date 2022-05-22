const Joi = require('joi');

const userAuthSchema = Joi.object({
  Email: Joi.string().email().lowercase().trim().required(),
  Password: Joi.string().required(),
});

module.exports = {
  userAuthSchema,
};
