const mongoose = require('mongoose')
const brandSchema = new mongoose.Schema({
    name: String,
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }
    ]
},
    {
        timestamps: true
    })
brandSchema.virtual('brands', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'brands'
})

brandSchema.virtual('Products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'brand'
})

const Brand = mongoose.model('Brand', brandSchema)
module.exports = Brand