const express = require('express')
//user model
const Brand = require('../database/models/Brand');
const Category = require('../database/models/Category');
const { route } = require('../app');
const router = new express.Router()


//create brand
router.post('/brands', async (req, res) => {
    const brand = new Brand(req.body);
  
    try {
        await brand.save();
        await Category.findByIdAndUpdate(brand.categories,
            { $push: { brands: brand._id } },
            { new: true, useFindAndModify: false });
        res.status(201).send(brand);
    } catch (error) {
        res.status(202).send(error)
    }

})
//get all brands
router.get('/brands', async (req, res) => {
    try {
        const brands = await Brand.find({}).populate("categories", "-_id -__v -categories");
        res.send(brands);
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router;

