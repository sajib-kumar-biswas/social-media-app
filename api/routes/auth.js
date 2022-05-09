const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User')

router.post('/register', async (req, res) => {

    try {
        bcrypt.genSalt(10, (err1, salt) => {
            bcrypt.hash(req.body.password, salt, async (err2, hashedPassword) => {
                const newUser = await new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                })
                const user = await newUser.save();
                res.status(200).json(user);
            })
        })
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(!user) return res.status(404).json('user not found');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).json("wrong password");

        res.status(200).json(user)
    }
    catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;