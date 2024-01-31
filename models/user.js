import mongoose from "mongoose";
import Joi  from "joi";
import jwt  from "jsonwebtoken";


const userSchema = mongoose.Schema({
userName: String,
password: String,
email: { type: String, unique: true },
role: { type: String, default: "USER" },
registrationDate:{type:Date,default:Date.now}
})

export const userModel = mongoose.model("users", userSchema)

export const userValidatorForAdd = (user) => {
    const shoeValidationSchema = Joi.object().keys({
        password: Joi.string().min(4).max(8).required(),
        userName: Joi.string().min(2).max(8).required(),
        email: Joi.string().email().required()
    })
    return shoeValidationSchema.validate(user);
}
export const userValidatorForLogin = (user) => {
    const userValidationSchema = Joi.object().keys({
        password: Joi.string().min(4).max(8).required(),
        email: Joi.string().email().required()
    })
    return userValidationSchema.validate(user);
}
export const generateToken = (_id, role, userName) => {
     let token = jwt.sign({ _id, userName, role },
    process.env.SECRET_JWT, {
     expiresIn: "1h" });
     return token;
    }