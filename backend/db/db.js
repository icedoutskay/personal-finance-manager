const mongoose = require ('mongoose')

const db = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL)
    } catch (error) {
        console.log ('DB connection error', error.message)
    }
}
module.exports = {db}