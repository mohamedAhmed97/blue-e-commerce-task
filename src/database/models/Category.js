const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
    name: String,
    brands: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand"
        }
    ]
},
    {
        timestamps: true
    })

    categorySchema.virtual('categories', {
        ref: 'Brand',
        localField: '_id',
        foreignField: 'categories'
    })

const Category = mongoose.model('Category', categorySchema)
module.exports = Category