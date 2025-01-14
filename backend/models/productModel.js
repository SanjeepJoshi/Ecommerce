const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema({
    product_name: {
        type: String, required: true, trim: true
    },
    product_price: {
        type: Number, required: true
    },
    product_description: {
        type: String, required: true, trim: true
    },
    product_image: {
        type: String, trim: true
    },
    product_category: {
        type: ObjectId, ref: "Category"
    },
    product_rating: {
        type: Number, Default: 2, required: true
    },
    product_date: {
        type: Date, default: Date.now
    }
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)