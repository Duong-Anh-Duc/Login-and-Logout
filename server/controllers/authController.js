const { hashPassword, comparePassword } = require("../helpers/authHelper")
const UserModel = require("../models/userModel")

module.exports.registerUser = async (req, res) => {
    try{
     const {name, email, password} = req.body
     console.log(name, email ,password)
     if(!name){
        return res.json({
            error: "Name is required"
        })
     }
     if(!password || password.length < 8){
        return res.json({
            error : "Password is required and should be at least 8 characters long"
        })
     }
     const exist = await UserModel.findOne({email})
     if(exist){
        return res.json({
            error : "Email is taken already"
        })
     }
     const hashedPassword = await hashPassword(password)
     const user = await UserModel.create({
        name : name,
        email : email,
        password : hashedPassword
     })
     return res.json(user)
    }catch(error){
        console.log(error)
    }
}
module.exports.loginUser = async(req, res) => {
   try {
    const {email, password} = req.body
    const user = await UserModel.findOne({email})
    // Check if user exists
    if(!user){
        return res.json({
            error : "No user found!"
        })
    }
    const match = await comparePassword(password, user.password)
    if(match){
        res.json({
        message : 'Login Success!'
    })
    }
    else{
        res.json({
            error: "Wrong password!"
        })
    }
   } catch (error) {
        console.log(error)
   } 
}