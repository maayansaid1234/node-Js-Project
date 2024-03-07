
import Joi from "joi";
import mongoose from "mongoose";



export const shoeSchema = mongoose.Schema({
    category:{type:String,required:true},
    brand:{type:String,required:true},
    price:{type:Number,required:true},
    color:String,
    model:String,
    providerNum:{type:String,required:true},
    src:String,
    description:{type:String,required:true,unique:true}
// ,sizes:Array
  
})

export const ShoeModel = mongoose.model("shoes", shoeSchema);

export const shoeValidatorForAdd = (shoe) => {
    const shoeValidationSchema = Joi.object().keys({
        price: Joi.number().min(50).max(1000).required(),
        providerNum: Joi.string().required(),
        brand:Joi.string().required(),
        color:Joi.string(),
        category:Joi.string().required(),
        model:Joi.string(),
        src:Joi.string(),
        description:Joi.string().required(),
        // sizes:Joi.array(Joi.number).required()

    })
    return shoeValidationSchema.validate(shoe);
}

export const shoeValidatorForUpdate = (shoe) => {
    const shoeValidationSchema = Joi.object().keys({
        price: Joi.number().min(50).max(1000),
        providerNum: Joi.string(),
        brand:Joi.string(),
        color:Joi.string(),
        category:Joi.string(),
        model:Joi.string(),
        src:Joi.string(),
        description:Joi.string(),
        // sizes:Joi.array(Joi.number)
    })
    return shoeValidationSchema.validate(shoe);
}