const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config()
// TODO: 1.register (POST API) the user
router.post("/register", async(req, res)=> {
    try{
        const {name, email, password} = req.body;

        // a. we've to check if the user is already existing if user is already existing throw the error
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({message: "User already exists"})
        }
        // b. hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        // c. create the user

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        return res.status(201).json({message: "User registered successfully"})

    }catch(error){
        console.log(error)
        return res.status(500).json({message: "Server error"})
    }
})

// TODO: 2.Login the user
router.post("/login", async(req, res)=> {

    try{

        // postman, isomania, thunderclient
        // email, password login
        const {email, password} = req.body;

        // a. check if the user is already exists
        const user = await User.findOne({email})
        if (!user){
            return res.status(401).json({message: "Invalid credentials"})
        }
        // b. compare the password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(401).json({message: "Invalid credentials"})
        }

        // c. generate the JWT token
        const token = jwt.sign(
            {userId: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )

        // d. send the user information along with the jwt token

        return res.json({
            message: "Logged in successfully",
            token, 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({message: "Server error"})
    }
})




module.exports = router;