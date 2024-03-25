
import Joi from "joi";
import mongoose from "mongoose";


const minimalShoeSchema = mongoose.Schema({
    _id:String,
    description:String,
    price: Number,
    amount:Number ,
    // selectedSize:Number
})
const orderSchema = mongoose.Schema({
    orderDate:{type:Date,default:Date.now},
  
    address:String,
    userId: String,
    products:[minimalShoeSchema],
    isDone:{type:Boolean,default:false}
  
})

export const OrderModel = mongoose.model("orders", orderSchema);

export const orderValidatorForAdd = (order) => {
    const orderValidationSchema = Joi.object().keys({
        orderDate: Joi.date(),
      
        address:Joi.string().required(),
        products:Joi.array().required()
    })
    return orderValidationSchema.validate(order);
}

export const orderValidatorForUpdate = (order) => {
    const orderValidationSchema = Joi.object().keys({
        isDone:Joi.bool().required()
    })
    return orderValidationSchema.validate(order);
}