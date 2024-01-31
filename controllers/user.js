import { userModel, userValidatorForAdd, userValidatorForLogin } from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../models/user.js";

export const addUser = async (req, res) => {
    let { email, password, userName } = req.body;

    const errors =  userValidatorForAdd(req.body).error
    if(errors)
    return res.status(404).json(errors.details[0].message)
    try {
        const sameUser = await userModel.findOne({ email: email });
        if (sameUser)
            return res.status(409).json({ type: "same user", message: "user with such email already exists" })
        let hashedPassword = await bcrypt.hash(password, 15);
        let newUser = new userModel({ email, password:hashedPassword, userName });
        await newUser.save();
         let token = generateToken(newUser._id, newUser.role,
        newUser.userName);
     return res.json({ _id: newUser._id, userName: newUser.userName,
        token, email: newUser.email,role:newUser.role,registrationDate:newUser.registrationDate })
     }
    
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "cannot add user" })
    }
}

export const login = async (req, res) => 
{

    let { email, password } = req.body;

    const errors =  userValidatorForLogin(req.body).error
    if(errors)
    return res.status(404).json(errors.details[0].message)
    
    try {
        const user = await userModel.findOne({ email: email });
        if (!user)
            return res.status(404).json({ type: "wrong  email", message: "one or more details are invalid" })
       const result= await bcrypt.compare(password, user.password)
        if(result==false)
            return res.status(404).json({ type: "wrong passsword", message: "user password is invalid" })
            let token = generateToken(user._id, user.role, user.userName);
            return res.json({ _id: user._id, userName: user.userName,
                token, email: user.email,role:user.role,registrationDate:user.registrationDate })
             }
      
    
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "cannot sign in " })
    }
}

export const getAllUsers = async (req, res) => {

    try {

        let allUsers = await userModel.find({}, "-password");
        return res.json(allUsers);

    } catch (err) {
        return res.status(400).json({ type: "invalid operation", message: "cannot sign in user" })
    }
}