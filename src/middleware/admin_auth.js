const jwt = require('jsonwebtoken');
const Admin = require('../database/models/Admin');

const Auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, "AdminToken");
        console.log(decode);
        const admin = await Admin.findOne({ _id: decode._id, 'tokens.token': token });
        if (!admin) {
            throw new Error({error: 'Not Found.'});
        }
        req.token = token
        req.user = admin;
        next();
    }
    catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
};


module.exports = Auth
