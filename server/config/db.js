const mongoose = require("mongoose")
module.exports.connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected!")
    }catch(error){
        console.log("Database connected fail!")
    }
}