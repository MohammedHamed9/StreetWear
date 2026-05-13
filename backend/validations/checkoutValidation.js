const Joi=require("joi");

const idParamSchema=Joi.object({
    id:Joi.string().hex().length(24).required()
});

const orderItemSchema=Joi.object({
    productId:Joi.string().hex().length(24).required(),
    name:Joi.string().trim().required(),
    size:Joi.string().trim().allow(""),
    color:Joi.string().trim().allow(""),
    price:Joi.number().positive().required(),
    image:Joi.string().trim().required(),
    quantity:Joi.number().integer().min(1).required()
});

const shippingAddressSchema=Joi.object({
    address:Joi.string().trim().required(),
    city:Joi.string().trim().required(),
    country:Joi.string().trim().required(),
    postalCode:Joi.string().trim().required(),
    phone:Joi.string().trim().required()
});

const createCheckoutSchema=Joi.object({
    checkoutItems:Joi.array().items(orderItemSchema).min(1).required(),
    shippingAddress:shippingAddressSchema.required(),
    paymentMethod:Joi.string().trim().required(),
    totalPrice:Joi.number().positive().required()
});

const payCheckoutSchema=Joi.object({
    paymentStatus:Joi.string().trim().valid("paid","pending","failed").required(),
    paymentDetails:Joi.object().unknown(true)
});

module.exports={
    createCheckoutSchema,
    payCheckoutSchema,
    idParamSchema
};
