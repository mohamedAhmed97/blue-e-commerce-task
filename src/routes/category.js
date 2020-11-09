const express = require('express')
const Category = require('../database/models/Category');
const Brand = require('../database/models/Brand');
const { route } = require('../app');
const router = new express.Router()

//create brand
router.post('/categories', async (req, res) => {
    const category = new Category(req.body);
    try {
        await category.save();
        await Brand.findByIdAndUpdate(category.brands,
            { $push: { categories: category._id } },
            { new: true, useFindAndModify: false });
        res.status(201).send(category);
    } catch (error) {
        res.status(202).send(error)
    }

})
//get all brands
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find({}).populate("brands","-_id -__v -brands");
        res.send(categories);
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router;

