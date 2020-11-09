const express = require('express')
//user model
const Admin = require('../database/models/Admin')
//Auth 
const Auth = require('../middleware/admin_auth')
const router = new express.Router()
//confirm password
const confirmPassword = require('../middleware/confirm_password')


//get all users
router.get('/admins', async (req, res) => {
    try {
        const users = await Admin.find({});
        res.send(users);
    } catch (error) {
        res.send(error)
    }
})
//insert user
router.post('/admins', confirmPassword, async (req, res) => {
    const user = new Admin(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token });

    } catch (error) {
        res.status(202).send(error);
    }
})

router.post('/admins/login', async (req, res) => {
    try {
        const user = await Admin.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (err) {
        res.status(400).send({ error: "Unable To Login" })
    }
})
router.post('/admins/logout', Auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send({ logout: "done" })
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/admins/logoutAll', Auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send({ logout: "done" })
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router