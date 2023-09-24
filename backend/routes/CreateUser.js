const express = require('express')
const router = express.Router()
const User = require('../models/Users')
const { body, validationResult } = require('express-validator')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secret_key = "mynameissanjeevKumar88978"


// route to create user
router.post('/createUser', [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 })
]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let setPassword = await bcrypt.hash(req.body.password, salt)
        try {
            User.create({
                name: req.body.name,
                password: setPassword,
                email: req.body.email,
                location: req.body.location,

            })
            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })


// route to Login user
router.post('/loginUser'
    , [
        body('email').isEmail(),
        body('password').isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try login with correct email" })
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try login with correct password" })
            }

            // jwt token authentication
            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, secret_key)
            return res.json({ success: true, authToken: authToken })
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })

module.exports = router;