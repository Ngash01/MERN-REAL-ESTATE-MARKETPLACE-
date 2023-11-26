import  bcrypt  from "bcrypt"
import Users from "../models/userModel.js"

// test the user's route
export const TestRoute = (req, res)=>{
    res.status(200).send("This is the user's Route")
}


// updateUser
export const updateUser = async(req, res)=>{
    let hashedPassword

        if(req.body.password){
            const salt = await bcrypt.genSalt(3)
            hashedPassword = await bcrypt.hash(req.body.password, salt)
        }

        try{
            const updatdUser = await Users.findByIdAndUpdate(req.params.id, {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                profilePic: req.body.profilePic
            },{new:true})
            
            const {password, ...info} = updatdUser._doc
            res.status(200).send({msg:"user updated successfully", info})

        }catch(err){
            console.log(err)
            res.status(403).send(err)
        }
    }

// delete user
export const deleteUser = async(req, res)=>{
    if(req.body.userId === req.params.id){
        try{
            const user = await Users.deleteOne({_id: req.params.id})
            res.status(200).send("User deleted Successfully!")
        }catch(err){
            res.status(403).send(err)
        }
    }else{
        res.status(403).send("You can only delete your own Account")
    }
  
}


// get user

export const getUser = async(req, res)=>{
    try{
        const user = await Users.findById(req.params.id)
        res.status(200).send(user)
    }catch(err){
        console.log(err)
    }
}