const bcrypt = require('bcrypt')
module.exports.hashPassword = async(password) => {
    return new Promise(async(resolve, reject) => {
        try {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds)
            const hashpassword = await bcrypt.hash(password, salt)
            resolve(hashpassword)
        } catch (error) {
            reject(error)
        }
    })
}
module.exports.comparePassword = (password,hashpassword) => {
    return bcrypt.compare(password, hashpassword)
}