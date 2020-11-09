const express = require('express')
const app = express()
require('dotenv').config({ path: 'src/config/config.env' });
require("./database/mongosee")
const user = require("./routes/user")
const brand = require("./routes/brand")
const category = require("./routes/category")
const product = require('./routes/product');
const admin = require('./routes/admin');
//CROS
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type,Authorization ,Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,PATCH, OPTIONS');
    next();
});
//json
app.use(express.json());
//user route
app.use("/api", user)
//brand route
app.use("/api", brand)
//category route
app.use("/api", category);
//product
app.use("/api", product)
//admin
app.use("/api", admin)



module.exports = app