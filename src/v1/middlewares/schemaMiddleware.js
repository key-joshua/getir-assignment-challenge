/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
import validateSchema from './validateSchema';

/**
   * Handle validateReq.
   * @param {object} req user request.
   * @param {object} res data response.
   * @param {object} next move request.
   * @returns {object} data.
   */
const validateReq = (req, res, next) => {
  const dataSchema = Joi.object()
    .keys({
      startDate: Joi.date().required().messages({
        'any.required': 'startDate is required',
        'string.empty': 'startDate is not allowed to be empty',
      }),
      endDate: Joi.date().required().messages({
        'any.required': 'endDate is required',
        'string.empty': 'endDate is not allowed to be empty',
      }),
      minCount: Joi.number().required().messages({
        'any.required': 'minCount is required',
        'string.empty': 'minCount is not allowed to be empty',
      }),
      maxCount: Joi.number().required().messages({
        'any.required': 'maxCount is required',
        'string.empty': 'maxCount is not allowed to be empty',
      }),
    })
    .options({ abortEarly: false });

  return validateSchema(dataSchema, req.body, res, next);
};

export { validateReq };
