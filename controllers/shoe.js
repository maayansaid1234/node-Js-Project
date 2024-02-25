import mongoose from "mongoose";
import { ShoeModel, shoeValidatorForAdd, shoeValidatorForUpdate } from "../models/shoe.js"

// export const getAllShoes = async (req, res) => {
//     let txt = req.query.txt || undefined;
//     let page = req.query.page || 1;
//     let perPage = req.query.perPage || 30;
//     try {

//         let allShoes = await ShoeModel.find({
//             $or:
//                 [{ brand: txt }, {category:txt  },{model:txt}]  }  )
   
//         .skip((page - 1) * perPage).limit(perPage);
       
//       return  res.json(allShoes)

//     }
//     catch (err) {
//         res.status(400).json({ type: "invalid operation", message: "sorry cannot get all shoes" })
//     }
// }



export const getAllShoes = async (req, res) => {
    let txt = req.query.txt || undefined;
    let page = req.query.page || 1;
    let perPage = req.query.perPage || 3;

    try {
        let query = {};

        if (txt) {
            query.$or = [
                { brand: { $regex: new RegExp(txt, 'i') } },
                { category: { $regex: new RegExp(txt, 'i') } },
                { model: { $regex: new RegExp(txt, 'i') } }
            ];
        }

        let allShoes = await ShoeModel.find(query)
            .skip((page - 1) * perPage)
            .limit(perPage);

    

        return res.json(allShoes);
    } catch (err) {
        console.error(err);
        res.status(400).json({ type: "Invalid operation", message: "can't get all shoes" });
    }
}



export const getShoeById = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id)) {   
         return res.status(400).json({ type: " invalid id", message: "id is not in the right format" })
         }
         let shoe = await ShoeModel.findById(id);
        if (!shoe)
            return res.status(404).json({ type: "Not found", message: "There is no shoe with such id" })
        return res.json(shoe)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get shoe" })
    }

}


export const deleteShoe = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "not valid id", message: "id is not in the  right format" })
        let shoe = await ShoeModel.findByIdAndDelete(id);
        if (!shoe)
            return res.status(404).json({ type: "Not found", message: "There is no shoe with such id to delete" })

        return res.json(shoe)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get shoe" })
    }

}

export const addShoe = async (req, res) => {
    let { description} = req.body;
    const errors =  shoeValidatorForAdd(req.body).error
    if(errors)
    return res.status(404).json(errors.details[0].message)
    try {
        let sameShoe = await ShoeModel.findOne({description});
        if (sameShoe)
            return res.status(409).json({ type: "same details", message: "The shoe already exists" })
        let newShoe = new ShoeModel(req.body)
        await newShoe.save();
        return res.json(newShoe)
    }
    catch (err) {
        console.log(err)
      return  res.status(400).json({ type: "invalid operation", message: "sorry cannot add Shoe" })
    }

}


export const updateShoe = async (req, res) => {

    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ type: "not valid id", message: "id is  not in the right format" })
    
        const errors =  shoeValidatorForUpdate(req.body).error
        if(errors)
        return res.status(404).json(errors.details[0].message)
    try {
        let shoe = await ShoeModel.findById(id);
        if (!shoe)
            return res.status(404).json({ type: " not found", message: "There is no shoe with such id" })
     

        let updated = await ShoeModel.findByIdAndUpdate(id, req.body, { new: true })

        return res.json(updated);

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot update shoe" })
    }

}
export const getAmountOfShoes=async(req,res)=>{
    try{
    let arr=await ShoeModel.find({});
    let amount=arr.length;
    return res.json({amount:amount}); 
    }
    catch(err){

       return res.status(400).json({ type: "invalid operation", message: "sorry cannot get amount of all shoes" })
    }
   
}