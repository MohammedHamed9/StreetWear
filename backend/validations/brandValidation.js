const Joi=require("joi");

const idParamSchema=Joi.object({
    id:Joi.string().hex().length(24).required()
});

const createBrandSchema=Joi.object({
    name:Joi.string().trim().min(3).max(100).required()
});

const updateBrandSchema=Joi.object({
    name:Joi.string().trim().min(3).max(100)
});

const deleteBrandsSchema=Joi.object({
    filter:Joi.array().items(Joi.string().hex().length(24)).required()
});

const getBrandsQuerySchema=Joi.object({
    page:Joi.number().integer().min(1),
    limit:Joi.number().integer().min(1).max(100),
    sort:Joi.string().trim(),
    fields:Joi.string().trim()
});

module.exports={
    idParamSchema,
    createBrandSchema,
    updateBrandSchema,
    deleteBrandsSchema,
    getBrandsQuerySchema
};
