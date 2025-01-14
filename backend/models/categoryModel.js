const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    // catagory_name:String
    category_name:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps: true})

//createdAt, updatedAt
// _id : default by mongodb- 24bit hex char (type: ObjectId)

module.exports = mongoose.model('Category', categorySchema)