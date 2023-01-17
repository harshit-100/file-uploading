 const express = require('express') ;
 const bcrypt = require('bcrypt') ;
 const router = express.Router();

 const User = require('../models/userModel');

 const {
    validateName,
    validateEmail,
    validatePassword
 } = require('../utils/validators') ;

 router.post('/signup' , async (req,res) => {
    try{
        const { name , email , password , isSeller }  = req.body ;

        const existinguser = await User.findOne({where:{email}}) ;
        if(existinguser){
            return res.status(403).json({err:"user is alrady exist"}) ;
        }
        if(!validateName(name)){
            return res.status(400).json({err:"Name validate fails"}) ;
        }
        if(!validateEmail(email)){
            return res.status(400).json({err:"Password validate fails"}) ;
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const user = {
            name ,
            email ,
            hashedPassword ,
            isSeller
        };

        const createdUser  = await User.create(user);

        return res.status(201).json({
            message : `Welcome ${createdUser.name}`, 

        });


    }
    catch(e){
        console.log(">>>>",e);
        return res.status(500).send(e) ;
    }

 })

 module.exports = router ;
