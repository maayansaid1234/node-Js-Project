
import Joi from "joi";
import mongoose from "mongoose";


const minimalShoeSchema = mongoose.Schema({
    _id:String,
    description:String,
    price: Number,
    amount:Number 
})
const orderSchema = mongoose.Schema({
    orderDate:Date,
    dueDate:Date,
    address:String,
    userId: String,
    products:[minimalShoeSchema],
    isDone:{type:Boolean,default:false}
  
})

export const OrderModel = mongoose.model("orders", orderSchema);

export const orderValidatorForAdd = (order) => {
    const orderValidationSchema = Joi.object().keys({
        orderDate: Joi.date().required(),
        dueDate: Joi.date().required(),
        address:Joi.string().required(),
        products:Joi.array()
    })
    return orderValidationSchema.validate(order);
}

export const orderValidatorForUpdate = (order) => {
    const orderValidationSchema = Joi.object().keys({
        isDone:Joi.bool().required()
    })
    return orderValidationSchema.validate(order);
}