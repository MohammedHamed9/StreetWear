const Joi=require("joi");

const idParamSchema=Joi.object({
    id:Joi.string().hex().length(24).required()
});

const productRef=Joi.string().hex().length(24).required();
const cartId=Joi.string().trim();

const addToCartSchema=Joi.object({
    productId:productRef,
    userId:Joi.string().hex().length(24),
    guestId:cartId,
    size:Joi.string().trim().min(1).required().valid("XS","S","M","L","XL","XXL"),
    color:Joi.string().trim().min(1).required(),
    quantity:Joi.number().integer().positive().required()
}).or("userId","guestId");

const updateCartSchema=Joi.object({
    productId:productRef,
    userId:Joi.string().hex().length(24),
    guestId:cartId,
    size:Joi.string().trim().min(1).required().valid("XS","S","M","L","XL","XXL"),
    color:Joi.string().trim().min(1).required(),
    quantity:Joi.number().integer().min(0).required()
}).or("userId","guestId");

const removeProductSchema=Joi.object({
    productId:productRef,
    userId:Joi.string().hex().length(24),
    guestId:cartId,
    size:Joi.string().trim().min(1).required(),
    color:Joi.string().trim().min(1).required()
}).or("userId","guestId");

const getCartQuerySchema=Joi.object({
    userId:Joi.string().hex().length(24),
    guestId:cartId
});

const mergeCartsSchema=Joi.object({
    guestId:cartId.required()
});

module.exports={
    addToCartSchema,
    updateCartSchema,
    removeProductSchema,
    getCartQuerySchema,
    mergeCartsSchema,
    idParamSchema
};
