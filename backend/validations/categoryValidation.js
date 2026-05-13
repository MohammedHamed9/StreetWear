const Joi=require("joi");

const idParamSchema=Joi.object({
    id:Joi.string().hex().length(24).required()
});

const createCategorySchema=Joi.object({
    name:Joi.string().trim().min(3).max(100).required(),
    type:Joi.string().trim().valid("Top","Bottom","Accessories").required()
});

const updateCategorySchema=Joi.object({
    name:Joi.string().trim().min(3).max(100),
    type:Joi.string().trim().valid("Top","Bottom","Accessories")
});

const deleteCategoriesSchema=Joi.object({
    filter:Joi.array().items(Joi.string().hex().length(24)).required()
});

const getCategoriesQuerySchema=Joi.object({
    page:Joi.number().integer().min(1),
    limit:Joi.number().integer().min(1).max(100),
    sort:Joi.string().trim(),
    fields:Joi.string().trim()
});

module.exports={
    idParamSchema,
    createCategorySchema,
    updateCategorySchema,
    deleteCategoriesSchema,
    getCategoriesQuerySchema
};
