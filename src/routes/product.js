
const express = require('express')
const route = express()
var multer = require('multer')
var upload = multer({
    dest: 'src/avatars',
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error("please Upload a png or jpg file"))
        }
        cb(undefined, true)
    }
})
const Product = require('../database/models/Product')
const auth = require('../middleware/admin_auth')

route.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.send(products);
})

//create product
route.post('/products', auth,upload.array('avatar'),async (req, res) => {
    try {
        const files = req.files
        req.body.images = Array();
        files.forEach(element => {
            req.body.images.push(element.originalname)
        });
        const product = new Product({ ...req.body, "owner": req.user._id });
        if (!product) {
            res.status(404).send("error in Save");
        }
        await product.save();
        await product.populate('owner').execPopulate();
        await product.populate('brand').execPopulate();
        res.send(product);

    } catch (error) {
        res.status(500).send(error);
    }
});
//get user ID
route.get('/products/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const product = await Product.findById({ _id });
        await product.populate('owner').execPopulate();
        if (!product) {
            res.status(404).send("Not Found");
        }

        res.send(product)
    } catch (error) {
        res.send(error);
    }
});
//delete user
route.delete('/products/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const product = await Product.findByIdAndDelete({ _id });
        if (!product) {
            res.status(404).send("no User have this id");
        }
        res.send(product)
    } catch (error) {
        res.status(500).send(error);
    }
});
/* 
//edit user
route.patch('/products/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'desc', 'price', 'quantity', 'images'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!product) {
            return res.status(404).send()
        }
        res.send(product)
    } catch (error) {
        res.send(error);
    }
}) */

module.exports = route