const express = require('express')
//user model
const User = require('../database/models/User')
//Auth 
const Auth = require('../middleware/auth')
const router = new express.Router()
//confirm password
const confirmPassword =require('../middleware/confirm_password')
//send mail
const sendMail=require('../mails/welcome')

//get all users
router.get('/users',async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.send(error)
    }
})
//insert user
router.post('/users',confirmPassword,async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken()
        await sendMail(req.body.email,req.body.name)
        res.status(201).send({ user, token });

    } catch (error) {
        res.status(202).send(error);
    }
})

router.post('/users/login',async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (err) {
        res.status(400).send({error:"Unable To Login"})
    }
})
router.post('/users/logout', Auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', Auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router