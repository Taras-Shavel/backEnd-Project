import Joi from "joi";

import { regexConstants } from "../constants";
import { EGender } from "../enums/user.enum";

export class AdminValidator {
  static firstName = Joi.string().min(3).max(30).trim();
  static surName = Joi.string().min(3).max(35).trim();
  static age = Joi.number().min(1).max(199);
  static gender = Joi.valid(...Object.values(EGender));
  static password = Joi.string()
    .min(6)
    .max(30)
    .trim()
    .required()
    .regex(regexConstants.PASSWORD);
  static email = Joi.string()
    .trim()
    .lowercase()
    .required()
    .regex(regexConstants.EMAIL)
    .messages({
      "string.empty": "Це поле обов'язкове, заповніть його.",
      "string.email": "Адрес електронної пошти має невірний формат",
    });
  static create = Joi.object({
    firstName: this.firstName.required(),
    surName: this.surName.required(),
    age: this.age.required(),
    gender: this.gender.required(),
    password: this.password.required(),
    email: this.email.required(),
  });
  static update = Joi.object({
    firstName: this.firstName,
    surName: this.surName,
    age: this.age,
  });
}
