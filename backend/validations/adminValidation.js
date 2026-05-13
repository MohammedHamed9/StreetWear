const Joi=require("joi");

const idParamSchema=Joi.object({
    id:Joi.string().hex().length(24).required()
});

const createUserSchema=Joi.object({
    name:Joi.string().trim().min(3).max(30).required(),
    email:Joi.string().trim().email().required(),
    password:Joi.string().trim().min(8).max(20).required(),
    role:Joi.string().trim().valid("Customer","Admin").default("Customer")
});

const updateUserSchema=Joi.object({
    name:Joi.string().trim().min(3).max(30),
    email:Joi.string().trim().email(),
    role:Joi.string().trim().valid("Customer","Admin")
});

const fieldsQuerySchema=Joi.object({
    fields:Joi.string().trim().max(200)
});

const updateOrderSchema=Joi.object({
    status:Joi.string().trim().valid("Processing","Shipped","Delivered","Cancelled"),
    isDelivered:Joi.boolean(),
    paymentStatus:Joi.string().trim().valid("pending","paid","failed"),
    paymentDetails:Joi.object().unknown(true)
});

module.exports={
    idParamSchema,
    createUserSchema,
    updateUserSchema,
    updateOrderSchema
};
