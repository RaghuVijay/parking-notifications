import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  MAIL_HOST: Joi.string().required(),
  MAIL_USERNAME: Joi.string().required(),
  MAIL_PASSWORD: Joi.string().required(),
  MAIL_PORT_NUMBER: Joi.number()
    .valid(587, 465, 25) // Adding common SMTP port validation
    .default(587) // Default to 587 if not provided
    .required(),
  AXIOS_PARKING_USER_MANAGEMENT_HOST: Joi.string().required(),
});
