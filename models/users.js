const { Schema, model } = require("mongoose")
const { handleMongooseError } = require('../helpers')
const Joi = require("joi");

const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

const userSchema = new Schema({
    
    name: {
        type: String,
        required: [true, 'Name is required'],
        // unique: true,
    },

    email: {
        type: String,
        match: emailRegex,
        required: [true, 'Email is required'],
        unique: true,
    },

    password: {
      type: String,
      minLength: 4,
      required: [true, 'Set password for user'],
    },
        // subscription: {
        //   type: String,
        //   enum: ["starter", "pro", "business"],
        //   default: "starter"
        // },
        // token: String
      
}, {versionKey:false, timestamps:true})

userSchema.post('save', handleMongooseError)

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(4).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(4).required(),
})


const schemas = {
    registerSchema,
	loginSchema,
}

const User = model('user', userSchema);

module.exports = {
	User,
	schemas
};