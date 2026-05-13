const Joi=require("joi");

const idParamSchema=Joi.object({
    id:Joi.string().hex().length(24).required()
});

module.exports={
    idParamSchema
};