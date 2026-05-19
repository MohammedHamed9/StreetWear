const Joi=require("joi");
const createProductSchema=Joi.object({
    name:Joi.string().trim().min(3).max(100).required().messages({
        'string.base': 'product name must be a text',
        'string.empty': 'product name cannot be empty',
        'string.min': 'product name should have at least 3 characters',
        'string.max': 'product name should not exceed 100 characters',
        'any.required': 'you have to provide a product name'
    }),
    description:Joi.string().trim().min(3).required().messages({
        'string.base': 'product description must be a text',
        'string.empty': 'product description cannot be empty',
        'string.min': 'product description should have at least 3 characters',
        'any.required': 'you have to provide a product description'
    }),
     price:Joi.number().positive().min(1).required().messages({
        'number.base': 'product price must be a number',
        'number.positive': 'price must be a positive number',
        'number.min': 'product price cant be less than 1',
        'any.required': 'you have to provide a product price'
    }),
     discountPrice:Joi.number().min(0).less(Joi.ref('price')).messages({
        'number.base': 'product discount price must be a number',
        'number.min': 'discount price must exceed 1',
        'number.less': 'discount price must be less than price!',
    }),
     category:Joi.string().trim().min(3).required().messages({
        'string.base': 'product category must be a text',
        'string.empty': 'product category cannot be empty',
        'string.min': 'product category should have at least 3 characters',
        'any.required': 'you have to provide a product category'
    }),
     brand:Joi.string().trim().min(3).required().messages({
        'string.base': 'product brand must be a text',
        'string.empty': 'product brand cannot be empty',
        'string.min': 'product brand should have at least 3 characters',
        'any.required': 'you have to provide a product brand'
    }),
    variants:Joi.array().items(Joi.object({
        color:Joi.string().trim().min(3).max(50).required().messages({
        'string.base': 'the product color must be a text',
        'string.empty': 'the product color cannot be empty',
        'string.min': 'the product color should have at least 3 characters',
        'string.max': 'the product color cant exceed 50 characters',
        'any.required': 'you have to provide a product color'
    }),
        size:Joi.string().trim().min(1).valid("XS","S","M","L","XL","XXL","XXXL").required().messages({
        'string.base': 'the product size must be a text',
        'string.empty': 'the product size cannot be empty',
        'any.required': 'you have to provide a the product size'
    }),
        stock:Joi.number().integer().min(0).required()
     .messages({
        'number.base': 'stock must be a number',
        'number.integer': 'stock must be a integer number',
        'number.min': 'stock cant be less than 0',
        'any.required': 'you have to provide the product stock'
    })
    })),
    material:Joi.string().trim().min(3).required().messages({
        'string.base': 'product material must be a text',
        'string.empty': 'product material cannot be empty',
        'string.min': 'product material should have at least 3 characters',
        'any.required': 'you have to provide a product material'
    }),
    gender:Joi.string().trim().min(3).valid("Men","Women","Unisex").required().messages({
        'string.base': 'product gender must be a text',
        'string.empty': 'product gender cannot be empty',
        'string.min': 'product gender should have at least 3 characters',
        'any.required': 'you have to provide a product gender',
        'any.only':'the gender can be only Men,Women,Unisex'
    }),
    collections:Joi.string().trim().min(3).required().messages({
        'string.base': 'product collections must be a text',
        'string.empty': 'product collections cannot be empty',
        'string.min': 'product collections should have at least 3 characters',
        'any.required': 'you have to provide a product collections'
    }),
    isFeatured:Joi.boolean().messages({
        'boolean.base': 'isFeatured must be a True or False',
        'boolean.empty': 'isFeatured cannot be empty',
    }),
    isPublished:Joi.boolean().messages({
        'boolean.base': 'isPublished must be a True or False',
        'boolean.empty': 'isPublished cannot be empty',
    }),
    weight:Joi.number().positive().messages({
        'number.base': 'product weight must be a number',
        'number.positive': 'product weight cant be less than 1',
    }),
    sku:Joi.string().trim().uppercase().min(3).required().messages({
        'string.base': 'product sku must be a text',
        'string.empty': 'product sku cannot be empty',
        'string.min': 'product sku should have at least 3 characters',
        'any.required': 'you have to provide a product sku'
    }),
    fit:Joi.string().trim().min(3).required().messages({
        'string.base': 'product fit must be a text',
        'string.empty': 'product fit cannot be empty',
        'string.min': 'product fit should have at least 3 characters',
        'any.required': 'you have to provide a product fit'
    }),
    rating:Joi.number().min(0).max(5).messages({
        'number.base': 'product rating must be a number',
        'number.min':'product rating cant be less than 0',
        'number.max':'product rating cant exceed 5',
    }),
    tags:Joi.array().items(Joi.string().trim().messages({
        'string.base':'the tag should be text',
        'string.empty':'the product tag cant be empty'
    })),
    metaTitle:Joi.string().trim().min(3).messages({
        'string.base': 'product metaTitle must be a text',
        'string.empty': 'product metaTitle cannot be empty',
        'string.min': 'product metaTitle should have at least 3 characters',
    }),
    metaDescription:Joi.string().trim().min(3).messages({
        'string.base': 'product metaDescription must be a text',
        'string.empty': 'product metaDescription cannot be empty',
        'string.min': 'product metaDescription should have at least 3 characters',
    }),
    metaKeywords:Joi.string().trim().min(3).messages({
        'string.base': 'product metaKeywords must be a text',
        'string.empty': 'product metaKeywords cannot be empty',
        'string.min': 'product metaKeywords should have at least 3 characters',
    }),
    dimensions:Joi.object({
        length:Joi.number().positive().messages({
        'number.base': 'product length must be a number',
        'number.positive': 'product length cant be less than 1',
    }),
        width:Joi.number().positive().messages({
        'number.base': 'product width must be a number',
        'number.positive': 'product width cant be less than 1',
    }),
        height:Joi.number().positive().messages({
        'number.base': 'product height must be a number',
        'number.positive': 'product height cant be less than 1',
    }),
    })
})
const updateProductSchema=Joi.object({
    name:Joi.string().trim().min(3).max(100).messages({
        'string.base': 'product name must be a text',
        'string.empty': 'product name cannot be empty',
        'string.min': 'product name should have at least 3 characters',
        'string.max': 'product name should not exceed 100 characters',
    }),
    description:Joi.string().trim().min(3).messages({
        'string.base': 'product description must be a text',
        'string.empty': 'product description cannot be empty',
        'string.min': 'product description should have at least 3 characters',
    }),
     price:Joi.number().min(1).messages({
        'number.base': 'product price must be a number',
        'number.min': 'product price cant be less than 1',
    }),
     discountPrice:Joi.number().min(0).less(Joi.ref('price')).messages({
        'number.base': 'product discount price must be a number',
        'number.min': 'discount price must exceed 1',
        'number.less': 'discount price must be less than price!',
    }),
     category:Joi.string().trim().min(3).messages({
        'string.base': 'product category must be a text',
        'string.empty': 'product category cannot be empty',
        'string.min': 'product category should have at least 3 characters',
    }),
     brand:Joi.string().trim().min(3).messages({
        'string.base': 'product brand must be a text',
        'string.empty': 'product brand cannot be empty',
        'string.min': 'product brand should have at least 3 characters',
    }),
    variants:Joi.array().items(Joi.object({
        color:Joi.string().trim().min(3).max(50).messages({
        'string.base': 'the product color must be a text',
        'string.empty': 'the product color cannot be empty',
        'string.min': 'the product color should have at least 3 characters',
        'string.max': 'the product color cant exceed 50 characters',
    }),
        size:Joi.string().trim().min(1).valid("XS","S","M","L","XL","XXL","XXXL")
        .messages({
        'string.base': 'the product size must be a text',
        'string.empty': 'the product size cannot be empty',
    }),
        stock:Joi.number().integer().min(0)
     .messages({
        'number.base': 'stock must be a number',
        'number.integer': 'stock must be a integer number',
        'number.min': 'stock cant be less than 0',
    })
    })),
    material:Joi.string().trim().min(3).messages({
        'string.base': 'product material must be a text',
        'string.empty': 'product material cannot be empty',
        'string.min': 'product material should have at least 3 characters',
    }),
    gender:Joi.string().trim().min(3).valid("Men","Women","Unisex").messages({
        'string.base': 'product gender must be a text',
        'string.empty': 'product gender cannot be empty',
        'string.min': 'product gender should have at least 3 characters',
        'any.only':'the gender can be only Men,Women,Unisex'
    }),
    collections:Joi.string().trim().min(3).messages({
        'string.base': 'product collections must be a text',
        'string.empty': 'product collections cannot be empty',
        'string.min': 'product collections should have at least 3 characters',
    }),
    isFeatured:Joi.boolean().messages({
        'boolean.base': 'isFeatured must be a True or False',
        'boolean.empty': 'isFeatured cannot be empty',
    }),
    isPublished:Joi.boolean().messages({
        'boolean.base': 'isPublished must be a True or False',
        'boolean.empty': 'isPublished cannot be empty',
    }),
    weight:Joi.number().positive().messages({
        'number.base': 'product weight must be a number',
        'number.positive': 'product weight cant be less than 1',
    }),
    sku:Joi.string().trim().uppercase().min(3).messages({
        'string.base': 'product sku must be a text',
        'string.empty': 'product sku cannot be empty',
        'string.min': 'product sku should have at least 3 characters',
    }),
    fit:Joi.string().trim().min(3).messages({
        'string.base': 'product fit must be a text',
        'string.empty': 'product fit cannot be empty',
        'string.min': 'product fit should have at least 3 characters',
    }),
    rating:Joi.number().min(0).max(5).messages({
        'number.base': 'product rating must be a number',
        'number.min':'product rating cant be less than 0',
        'number.max':'product rating cant exceed 5',
    }),
    tags:Joi.array().items(Joi.string().trim().messages({
        'string.base':'the tag should be text',
        'string.empty':'the product tag cant be empty'
    })),
    metaTitle:Joi.string().trim().min(3).messages({
        'string.base': 'product metaTitle must be a text',
        'string.empty': 'product metaTitle cannot be empty',
        'string.min': 'product metaTitle should have at least 3 characters',
    }),
    metaDescription:Joi.string().trim().min(3).messages({
        'string.base': 'product metaDescription must be a text',
        'string.empty': 'product metaDescription cannot be empty',
        'string.min': 'product metaDescription should have at least 3 characters',
    }),
    metaKeywords:Joi.string().trim().min(3).messages({
        'string.base': 'product metaKeywords must be a text',
        'string.empty': 'product metaKeywords cannot be empty',
        'string.min': 'product metaKeywords should have at least 3 characters',
    }),
    dimensions:Joi.object({
        length:Joi.number().positive().messages({
        'number.base': 'product length must be a number',
        'number.positive': 'product length cant be less than 1',
    }),
        width:Joi.number().positive().messages({
        'number.base': 'product width must be a number',
        'number.positive': 'product width cant be less than 1',
    }),
        height:Joi.number().positive().messages({
        'number.base': 'product height must be a number',
        'number.positive': 'product height cant be less than 1',
    }),
    }),
})
const getAllQueryProductsSchema=Joi.object({
    page:Joi.number().integer().min(1).default(1),
    limit:Joi.number().integer().min(1).max(100).default(10),
    collections:Joi.string().trim().min(3).messages({
        'string.base': 'product collections must be a text',
        'string.empty': 'product collections cannot be empty',
        'string.min': 'product collections should have at least 3 characters',
    }),
    size:Joi.string().trim(),
    color:Joi.string().trim(),
    gender:Joi.string().trim().valid("Men","Women","Unisex").messages({
        'string.base': 'product gender must be a text',
        'string.empty': 'product gender cannot be empty',
        'any.only':'the gender can be only Men,Women,Unisex'
    }),
    minPrice:Joi.number().min(0),
    maxPrice:Joi.number().min(0),
    sortBy:Joi.string().valid("priceAsc","priceDesc","popularity"),
    search:Joi.string().trim().max(100),
    category:Joi.string().trim().max(100),
    brand:Joi.string().trim().max(100),
    material:Joi.string().trim().max(50),
    fields:Joi.string().trim().max(50)
})
const ProductIdParams=Joi.object({
    id:Joi.string().hex().length(24).required()
})
module.exports={
    createProductSchema,
    updateProductSchema,
    getAllQueryProductsSchema,
    ProductIdParams}
