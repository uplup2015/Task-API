const Joi = require('joi');

const createTaskSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": "Title is required"
    }),
    description: Joi.string().allow("", null),
});

const updateTaskSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string().allow("", null),
    status: Joi.string().valid("pending", "in_progress", "done").messages({
        "any.only": "Status must be one of 'pending', 'in_progress', or 'done'"
    }),
});

module.exports = { createTaskSchema, updateTaskSchema };