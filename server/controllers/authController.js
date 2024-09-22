const { hashPassword, comparePassword } = require("../helpers/authHelper")
const UserModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
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
       jwt.sign({email : user.email, id: user._id, name : user.name}, process.env.JWT_SECRET, {},(err, token) => {
        if(err) throw err
        res.cookie('token', token).json(user)
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
module.exports.getProfile = async(req, res) => {
    const {token} = req.cookies
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    }
    else{
        res.json(null)
    }
}