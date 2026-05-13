const Joi=require("joi");
const loginSchema=Joi.object({
    email:Joi.string().required().trim().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
  }).messages({'any.required':"email: "+"email is required!"}),
  password:Joi.string().trim().required().min(8).max(20)

});

const registerSchema=Joi.object({
    name:Joi.string().min(3).max(10).required().trim().messages({
        'any.required':'name: the name is required!',

    }),
    email:Joi.string().required().trim().email({
        maxDomainSegments:2,
        tlds:{allow:['com','net']}
    }),
    password:Joi.string().trim().required().min(8).max(20),
    addresses:Joi.array().items(
    Joi.object({
    alias:Joi.string().trim().valid("home","work")
    .messages({
        'any.only':'please choise work or home address '}),
    city:Joi.string().trim(),
    area: Joi.string().trim(),
    street: Joi.string().trim(),
    building: Joi.number(),
    floor: Joi.number(),
    apartment: Joi.number(),
    postalCode: Joi.string().trim(),
     isDefault: Joi.boolean()
    })
    )
    

})
const updateMeSchema=Joi.object({
    password:Joi.forbidden().messages({
        'any.unknown':'this route is not for password!'
    }),
    name:Joi.string().trim().messages({
        'string.base':"Invalid name type!"
    }),
    email:Joi.string().email().trim().messages({
        'string.base':"Invalid email type!"
    }),
    addresses:Joi.array().items(
    Joi.object({
    alias:Joi.string().trim().valid("home","work")
    .messages({'any.only':'please choise work or home address '}),
    city:Joi.string().trim(),
    area: Joi.string().trim(),
    street: Joi.string().trim(),
    building: Joi.number().positive().min(1),
    floor: Joi.number().positive().min(0),
    apartment: Joi.number().positive().min(1),
    postalCode: Joi.string().trim(),
     isDefault: Joi.boolean()

    })
    ),
   phone:Joi.string().trim().pattern(/^01[01235][0-9]{8}$/).messages({
    'string.base':"Invalid phone type!",
    'string.pattern.base':"Invalid Egyptian phone number! Please provide a valid Egyptian mobile number (e.g., 01012345678)."
   })
})
const forgetPasswordSchema=Joi.object({
    email:Joi.string().email().trim().required().messages({
        'any.required':'You have to porive  your email address!',
         'string.base':"Invalid email type!"
    })
})
const resetPasswordSchema=Joi.object({
    password:Joi.string().trim().min(8).max(20).required().messages({
        'any.required':'You have to porive a password!',
         'string.base':"Invalid password type!"
    }),
    passwordConfirm:Joi.string().trim().min(8).max(20).required()
    .valid(Joi.ref('password'))
    .messages({
        'any.required':'You have to porive confirm password!',
         'string.base':"Invalid confirm password type!",
         'any.only':"confirm password must match password "
    })
})
const updatePasswordSchema=Joi.object({
    password:Joi.string().trim().min(8).max(20).required().messages({
        'any.required':'You have to porive a password!',
         'string.base':"Invalid password type!"
    }),
    
    newPassword:Joi.string().trim().min(8).max(20).required().messages({
        'any.required':'You have to porive a new password!',
         'string.base':"Invalid new password type!"
    }),
    passwordConfirm:Joi.string().trim().min(8).max(20).required()
    .valid(Joi.ref('newPassword'))
    .messages({
        'any.required':'You have to porive confirm password!',
         'string.base':"Invalid confirm password type!",
         'any.only':"confirm password must match the new password "
    }),
})
module.exports={loginSchema,
    registerSchema,updateMeSchema,
    forgetPasswordSchema,
    resetPasswordSchema,
    updatePasswordSchema}