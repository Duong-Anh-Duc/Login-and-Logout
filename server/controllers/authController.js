const UserModel = require("../models/userModel")

module.exports.test = (req, res) => {
    res.json("test is working")
}
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
     const user = await UserModel.create({
        name : name,
        email : email,
        password : password
     })
     return res.json(user)
    }catch(error){
        console.log(error)
    }
}