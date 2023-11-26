import Users from "../models/userModel.js"
import bcrypt from "bcrypt"
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"

// create user
export const signUp = async(req, res, next)=>{
    try{
        const salt = await bcrypt.genSalt(3);
        const hashPassword = await bcrypt.hash(req.body.password, salt)
    
        const newUser = await Users.create({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        });
        res.status(200).send({msg: "User created successfully!",newUser})
    }catch(err){
        next(err)
    }

}

// Login User
export const LoginUser = async(req, res, next)=>{
    try{
        const user = await Users.findOne({email: req.body.email})
        if(!user){
            // res.status(403).send("email does not exist!")
           return next(errorHandler(404, "email does not exist!"))
        }

        const checkPassword = await bcrypt.compare(req.body.password, user.password)
        if(!checkPassword){
            // res.status(403).send("Incorrect password!")
            return next(errorHandler(401, "Invalid Password!"))
        }
            const {password, ...info} = user._doc
            const token = jwt.sign({id: info._id}, process.env.SECRET_KEY)
            res.cookie('access_token', token, {httpOnly:true}).status(200).send({msg: "user loggedIn successfully", info})
            
    }catch(err){
        // console.log(err)
        // res.status(403).send(err)
        next(err)
    }
}


