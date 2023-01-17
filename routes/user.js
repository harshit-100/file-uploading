const express = require("express");
 const bcrypt = require('bcrypt') ;
 const jwt = require('jsonwebtoken');
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
        //console.log(">>>>",e);
        return res.status(500).send(e) ;
    }

 });
 
 router.post('/signin',async(req,res) =>{
    try {
        const { email , password } = req.body ;
    
        if(email.length === 0){
           return res.status(400).json({
            err:"please enter eamil"
           }); 
        }

        if(password.length === 0 ){
            return res.status(400).json({
             err:"please enter password"
            }); 
        }
        const existingUser = await User.findOne({where: {email}}) ;
        if(!existingUser){
            return res.status(404).json({
                err: "user not found"
            });
        }

        const passwordMatched = await bcrypt.compare(
            password,
            existingUser.password
          );
      
        if(!passwordMatched){
            return res.json(500).json({
                err:"email or password not matched"
            });
        }

        const payload = {user : {id: existingUser.id}};
        const bearerToken = await jwt.sing(password, "SECRATE MESSAGE", {
            expiresIn: 36000,
        });
        res.cookie('t',bearerToken, {expires: new Date() + 9999});

        return res.status(200),json({
            bearerToken
        });

    }
    catch(e){
        console.log('>>>>',e);
        return res.status(500).send(e);
    }
 });


 module.exports = router ;
