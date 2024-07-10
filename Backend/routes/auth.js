const express = require("express");
const Users = require("../models/Users");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET_KEY = "Trustthe$process";

const router = express.Router();

router.post("/register", [
        body('email').isEmail(),
        body('name').isLength({min: 3}),
        body('password').isLength({min:5})], 
        async(req, res)=>{
        let success2 = false;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({result: result.array()});
        }

        const salt = await bcrypt.genSalt();
        const securePassword = await bcrypt.hash(req.body.password, salt);

        

        try{
            let user = await Users.create({
                name: req.body.name,
                email: req.body.email,
                password: securePassword,
            })

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET_KEY);
            success2 = true;
            res.json({success2, authToken});
        }catch(err){
            console.log(err.message);
            res.status(500).json({err: "Something Wrong Occured!"})
        }
    }
)


router.post("/login", [
        body('email').isEmail()], 
        async(req, res)=>{
            let success = false;
            const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({success, result: result.array()});
        }
            const {email, password} = req.body;
        try{
            let user = await Users.findOne({email})   ;
            if(!user){
                return res.status(400).json({success, message: "Email does not exist"});
            }
            const passCheck = await bcrypt.compare(password, user.password);
            console.log(passCheck)
            if(!passCheck){
                return res.status(400).json({success, message: "Invalid Credentials!"});
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            success = true;
            const authToken = jwt.sign(data, JWT_SECRET_KEY);
            res.status(200).json({success, authToken});
        }catch(ex){
            console.log(ex.message);
            res.status(500).json({ex: "Something Wrong Occured!"})
        }
    }
)


router.post("/getuser", fetchUser, async(req, res)=>{
    try {
        const userId = req.user.id;
        const user = await Users.findById(userId).select('-password');
        if(!user){
            return res.status(401).send("User not found!")
        }
        res.status(200).send(user);
    } catch(err){
        console.log(err.message);
        res.status(500).send("Wrong in getuser!")
    }
    
})

module.exports = router;