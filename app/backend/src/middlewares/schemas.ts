import * as Joi from 'joi';

const emailPassword = Joi.object({
  email: Joi.string().regex(/^\S+@\S+\.\S+$/).required(),
  password: Joi.string().min(6).required(),
});

export default {
  emailPassword,
};
